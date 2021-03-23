import { PassThrough } from 'stream'
import { Logger } from './logger'
import { BufferedPacketReader } from './BufferedPacketReader'
import { PacketDecoder } from './PacketDecoder'
import { PacketEncoder } from './PacketEncoder'
import { waitForSingleEvent, runWithTimeout } from './utils'

const log = Logger.getLogger('COMM')

export async function mspSend(port, request, protocol) {
  log.debug('>', request.toString())

  return new Promise((resolve, reject) => {
    const writter = new PassThrough({ readableObjectMode: true, writableObjectMode: true })
    const packetEncoder = new PacketEncoder(protocol)
    writter.pipe(packetEncoder).pipe(port)
    writter.write(request, e => {
      if (e) {
        reject(e)
      } else {
        packetEncoder.unpipe(port)
        writter.unpipe(packetEncoder)
        packetEncoder.end()
        writter.end()
        resolve(true)
      }
    })
  })
}

export async function mspReceive(port, commandRegistry, timeout = 100) {
  const packetDecoder = port
    .pipe(new BufferedPacketReader())
    .pipe(new PacketDecoder(commandRegistry))

  try {
    const response = await waitForSingleEvent(packetDecoder, 'data', timeout)
    log.debug('<', response.toString())
    return response
  } finally {
    port.unpipe(packetDecoder)
  }
}

export async function mspQuery(port, request, protocol, commandRegistry, timeout = 100) {
  return runWithTimeout(timeout, timeout, async () => {
    mspSend(port, request, protocol)
    try {
      const response = await mspReceive(port, commandRegistry, timeout)
      if (response.command === request.command) {
        return response
      } else {
        return false
      }
    } catch {
      return false
    }
  })
}

function mspQueryWithRetry(count) {
  return async (port, request, protocol, commandRegistry, timeout = 100) => {
    let counter = count
    while (counter > 0) {
      try {
        return await mspQuery(port, request, protocol, commandRegistry, timeout)
      } catch (e) {
        if (--counter === 0) throw e
        log.debug('Retrying', count - counter)
      }
    }
  }
}

export const sendAndWaitForResponse = mspQueryWithRetry(3)
export const sendAndWaitForResponseWithRetryCount = mspQueryWithRetry
