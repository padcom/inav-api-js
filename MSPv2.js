import { MSP } from './MSP'
import { readonly, hex } from './utils'

export class MSPv2 extends MSP {
  encode(direction, command, payload) {
    const payloadLength = payload && payload.length ? payload.length : 0;
    const length = payloadLength + 9;
    const view = new Uint8Array(length);
    view[0] = MSP.START_BYTE;
    view[1] = MSPv2.PROTOCOL_ID;
    view[2] = direction;
    view[3] = 0; // flag: reserved, set to 0
    view[4] = command & 0xFF;  // code lower byte
    view[5] = (command & 0xFF00) >> 8; // code upper byte
    view[6] = payloadLength & 0xFF; // payloadLength lower byte
    view[7] = (payloadLength & 0xFF00) >> 8; // payloadLength upper byte
    for (let i = 0; i < payloadLength; i++) {
      view[8 + i] = payload[i];
    }
    view[length-1] = this.#checksum(length, checksum);

    return Buffer.from(view)
  }

  #checksum(length, view) {
    let checksum = 0;
    for (let i = 3; i < length - 1; i++) {
      checksum = this.#crc8_dvb_s2(checksum, view[i]);
    }
    return checksum
  }

  #crc8_dvb_s2(crc, ch) {
    crc ^= ch;
    for (let i = 0; i < 8; ++i) {
      if (crc & 0x80) {
        crc = ((crc << 1) & 0xFF) ^ 0xD5;
      } else {
        crc = (crc << 1) & 0xFF;
      }
    }
    return crc;
  }
}

readonly(MSPv2, 'PROTOCOL_ID', 'X'.charCodeAt(0))

MSPv2.decodeCommandCode = function(buffer) {
  if (buffer instanceof Buffer) return buffer[4]
  else if (buffer instanceof DataView) return buffer.getUint8(4)
  else throw new Error('Don\'t know how to fetch command code from', buffer.prototype)
}

MSPv2.decodePayloadOffset = function(buffer) {
  throw new Error('Not implemented')
}

MSPv2.decodePayloadLength = function(buffer) {
  throw new Error('Not implemented')
}

MSPv2.decodeExpectedPacketLength = function(buffer) {
  return MSPv2.decodePayloadLength(buffer) + MSPv2.decodePayloadOffset(buffer) + 1
}
