import { readonly } from '../utils'

export class MSP {
  decode(buffer) {
    throw new Error('Packet class is abstract and does not implement the "decode" method. Use protocol-specific packet class instead.')
  }
  
  encode(direction, command, payload) {
    throw new Error('Packet class is abstract and does not implement the "encode" method. Use protocol-specific packet class instead.')
  }
}

readonly(MSP, 'START_BYTE', '$'.charCodeAt(0))
readonly(MSP, 'DIRECTION_FROM_MSC', '>'.charCodeAt(0))
readonly(MSP, 'DIRECTION_TO_MSC', '<'.charCodeAt(0))
readonly(MSP, 'UNSUPPORTED', '!'.charCodeAt(0))

MSP.decodeStartCode = function(buffer) {
  return buffer[0]
}

MSP.decodeDirectionCode = function(buffer) {
  if (buffer instanceof Buffer) return buffer[2]
  else if (buffer instanceof DataView) return buffer.getUint8(2)
  else throw new Error('Don\'t know how to read direction code from', buffer.toString())
}

MSP.decodeProtocolCode = function(buffer) {
  if (buffer instanceof Buffer) return buffer[1]
  else if (buffer instanceof DataView) return buffer.getUint8(1)
  else throw new Error('Don\'t know how to read protocol code from', buffer.toString())
}
