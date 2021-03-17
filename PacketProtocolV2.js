import { PacketProtocol, symbols } from './PacketProtocol.js'

export class PacketProtocolV2 extends PacketProtocol {
  encode(code, data) {
    const payloadLength = data && data.length ? data.length : 0;
    const length = payloadLength + 9;
    const view = new Uint8Array(length);
    view[0] = symbols.BEGIN;
    view[1] = symbols.PROTO_V2;
    view[2] = symbols.TO_MWC;
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