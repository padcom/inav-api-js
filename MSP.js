export const symbols = {
  BEGIN: '$'.charCodeAt(0),
  PROTO_V1: 'M'.charCodeAt(0),
  PROTO_V2: 'X'.charCodeAt(0),
  FROM_MWC: '>'.charCodeAt(0),
  TO_MWC: '<'.charCodeAt(0),
  UNSUPPORTED: '!'.charCodeAt(0),
}

export class MSP {
  decode(buffer) {
    throw new Error('Packet class is abstract and does not implement the "decode" method. Use protocol-specific packet class instead.')
  }
  
  encode(code, data) {
    throw new Error('Packet class is abstract and does not implement the "encode" method. Use protocol-specific packet class instead.')
  }
}

MSP.decodeCommandCode = function(buffer) {
  if (buffer instanceof Buffer) return buffer[4]
  else if (buffer instanceof DataView) return buffer.getUint8(4)
}

MSP.decodeProtocol = function(buffer) {
  if (buffer instanceof Buffer) return buffer[1]
  else if (buffer instanceof DataView) return buffer.getUint8(1)
}
