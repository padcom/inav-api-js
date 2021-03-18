import { readonly } from './utils'

export class MSP {
  decode(buffer) {
    throw new Error('Packet class is abstract and does not implement the "decode" method. Use protocol-specific packet class instead.')
  }
  
  encode(code, data) {
    throw new Error('Packet class is abstract and does not implement the "encode" method. Use protocol-specific packet class instead.')
  }
}

readonly(MSP, 'START_BYTE', '$'.charCodeAt(0))
readonly(MSP, 'DIRECTION_FROM_MSC', '>'.charCodeAt(0))
readonly(MSP, 'DIRECTION_TO_MSC', '<'.charCodeAt(0))
readonly(MSP, 'UNSUPPORTED', '!'.charCodeAt(0))

MSP.decodeCommandCode = function(buffer) {
  if (buffer instanceof Buffer) return buffer[4]
  else if (buffer instanceof DataView) return buffer.getUint8(4)
}

MSP.decodeProtocolCode = function(buffer) {
  if (buffer instanceof Buffer) return buffer[1]
  else if (buffer instanceof DataView) return buffer.getUint8(1)
}
