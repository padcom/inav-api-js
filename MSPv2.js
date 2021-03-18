import { MSP } from './MSP'
import { readonly, hex } from './utils'

export class MSPv2 extends MSP {
  encode(code, data, direction = MSP.DIRECTION_TO_MSC) {
    const payloadLength = data && data.length ? data.length : 0;
    const length = payloadLength + 9;
    const view = new Uint8Array(length);
    view[0] = MSP.START_BYTE;
    view[1] = MSPv2.PROTOCOL_ID;
    view[2] = direction;
    view[3] = 0; // flag: reserved, set to 0
    view[4] = code & 0xFF;  // code lower byte
    view[5] = (code & 0xFF00) >> 8; // code upper byte
    view[6] = payloadLength & 0xFF; // payloadLength lower byte
    view[7] = (payloadLength & 0xFF00) >> 8; // payloadLength upper byte
    for (let i = 0; i < payloadLength; i++) {
      view[8 + i] = data[i];
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
