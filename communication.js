import { PassThrough } from 'stream'
import { BufferedPacketReader } from './BufferedPacketReader'
import { PacketDecoder } from './PacketDecoder'
import { PacketEncoder } from './PacketEncoder'
import { waitForSingleEvent, runWithTimeout } from './utils'

export async function mspSend(port, request, protocol, debug = false) {
  if (debug) console.log('[MSP] >', request.toString())

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

export async function mspReceive(port, commandRegistry, timeout = 100, debug = false) {
  const packetDecoder = port
    .pipe(new BufferedPacketReader())
    .pipe(new PacketDecoder(commandRegistry))

  try {
    const response = await waitForSingleEvent(packetDecoder, 'data', timeout)
    if (debug) console.log('[MSP] <', response)
    return response
  } finally {
    port.unpipe(packetDecoder)
  }
}

export async function mspQuery(port, request, protocol, commandRegistry, timeout = 100, debug = false) {
  return runWithTimeout(timeout, timeout, async () => {
    mspSend(port, request, protocol, debug)
    try {
      const response = await mspReceive(port, commandRegistry, timeout, debug)
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
  return async (port, request, protocol, commandRegistry, timeout = 100, debug = false) => {
    let counter = count
    while (counter > 0) {
      try {
        return await mspQuery(port, request, protocol, commandRegistry, timeout, debug)
      } catch (e) {
        if (--counter === 0) throw e
        if (debug) console.log('[MSP] Retrying', count - counter)
      }
    }
  }
}

export const sendAndWaitForResponse = mspQueryWithRetry(3)
export const sendAndWaitForResponseWithRetryCount = mspQueryWithRetry
