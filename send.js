import { MSP } from './MSP'
import { MSPv1 } from './MSPv1'
import { MSPv2 } from './MSPv2'
import { CommandRegistry } from './CommandRegistry'

const PROTOCOL_CLASSES = {
  [MSPv1.PROTOCOL_ID]: MSPv1,
  [MSPv2.PROTOCOL_ID]: MSPv2
}

const registry = new CommandRegistry()
registry.init()

async function mspQuery(port, request, protocol, timeout = 1000, debug = false) {
  if (debug) console.log('[MSP]', request)

  return new Promise((resolve, reject) => {
    const t1 = new Date().getTime()
    const wait = setInterval(() => {
      const t2 = new Date().getTime()
      if (t2 - t1 > timeout) {
        clearInterval(wait)
        reject(new Error('Timeout'))
      }
    }, timeout / 10)

    const STATE_START = 0
    const STATE_CONTINUE_READING_DATA = 1

    let buffer = Buffer.from([])
    let state = STATE_START
    let ProtocolClass = null

    function handler(data) {
      if (debug) console.log('[MSP] <', data)

      function start() {
        buffer = data

        if (MSP.decodeStartCode(buffer) !== MSP.START_BYTE) {
          if (debug) console.log('[MSP] Buffer does not contain packet - ignoring')
          return
        }

        ProtocolClass = PROTOCOL_CLASSES[MSP.decodeProtocolCode(buffer)]

        if (ProtocolClass.decodeExpectedPacketLength(buffer) === buffer.length) {
          done()
        } else {
          state = STATE_CONTINUE_READING_DATA
        }
      }

      function more() {
        buffer = Buffer.concat([ buffer, data ])
        if (ProtocolClass.decodeExpectedPacketLength(buffer) === buffer.length) {
          done()
        }
      }
  
      function done() {
        const command = ProtocolClass.decodeCommandCode(buffer)
        if (command === request.command) {
          port.off('data', handler)
          clearInterval(wait)
          const ResponseClass = registry.getCommandByCode(command).response
          const protocol = new ProtocolClass()
          resolve(new ResponseClass(protocol, buffer))
        }
      }

      switch (state) {
        case STATE_START: {
          start()
          break
        }
        case STATE_CONTINUE_READING_DATA: {
          more()
          break          
        }
      }
    }

    port.on('data', handler)

    port.write(protocol.encode(MSP.DIRECTION_TO_MSC, request.command, request.payload), e => {
      if (e) {
        reject(e)
      } else {
        if (debug) console.log('[MSP] >', protocol.encode(request.code, request.payload))
      }
    })
  })
}

function mspWithRetry(count) {
  return async (port, request, protocol, timeout = 1000, debug = false) => {
    let counter = count
    while (counter > 0) {
      try {
        return await mspQuery(port, request, protocol, timeout, debug)
      } catch (e) {
        if (--counter === 0) throw e
        console.log('[MSP] Retrying', count - counter)
      }
    }
  }
}

export const send = mspWithRetry(3)
