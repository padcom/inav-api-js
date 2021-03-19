import { PassThrough } from 'stream'
import { PacketEncoderTransform } from './PacketEncoderTransform'
import { PacketDecoderTransform } from './PacketDecoderTransform'

export async function mspSend(port, request, protocol, debug = false) {
  if (debug) console.log('[MSP] >', request)

  return new Promise((resolve, reject) => {
    const writter = new PassThrough({ readableObjectMode: true, writableObjectMode: true })
    const packetEncoder = new PacketEncoderTransform(protocol)
    writter.pipe(packetEncoder).pipe(port)
    writter.write(request, e => {
      if (e) {
        reject(e)
      } else {
        if (debug) console.log('[MSP] >', request)
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
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('Timeout'))
    }, timeout)

    function cleanup() {
      clearTimeout(timer)
    }

    const packetDecoder = new PacketDecoderTransform(commandRegistry)
    const readStream = port.pipe(packetDecoder)

    function handler(response) {
      if (debug) console.log('[MSP] <', response)
      cleanup()
      resolve(response)
    }

    readStream.on('data', handler)
  })
}

async function mspQuery(port, request, protocol, commandRegistry, timeout = 100, debug = false) {
  const timer = setTimeout(cleanup, timeout)

  let waitingForResponse = true

  function cleanup() {
    waitingForResponse = false
    clearTimeout(timer)
  }

  // not using await here to immediately start listening for incoming messages
  mspSend(port, request, protocol, debug)
  while (waitingForResponse) {
    const response = await mspReceive(port, commandRegistry, timeout, debug)
    if (response.command === request.command) {
      cleanup()
      return response
    }
  }

  throw new Error('Timeout')
}

function mspQueryWithRetry(count) {
  return async (port, request, protocol, commandRegistry, timeout = 100, debug = false) => {
    let counter = count
    while (counter > 0) {
      try {
        return await mspQuery(port, request, protocol, commandRegistry, timeout, debug)
      } catch (e) {
        if (--counter === 0) throw e
        console.log('[MSP] Retrying', count - counter)
      }
    }
  }
}

export const send = mspQueryWithRetry(3)
