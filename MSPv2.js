import { MSP } from './MSP'
import { readonly, hex, getByteAtOffset } from './utils'

export class MSPv2 extends MSP {
  decode(buffer) {
    const begin = MSP.decodeStartCode(buffer)
    if (begin !== MSP.START_BYTE) {
      throw new Error(`Invalid start byte ${hex(buffer[0])}`)
    }

    const version = MSP.decodeProtocolCode(buffer)
    if (version !== MSPv2.PROTOCOL_ID) {
      throw new Error('Packet is not MSPv2')
    }

    const direction = this.#getDirection(buffer)
    const flags = this.#getFlags(buffer)
    const command = this.#getCommand(buffer)
    const payload = this.#getPayload(buffer)
    const crc = this.#getCRC(buffer)
    const calculatedCRC = this.#checksum(command, flags, payload)

    if (crc !== calculatedCRC) {
      throw new Error(`Invalid CRC: got ${hex(crc)} expected ${hex(calculatedCRC)}`)
    }

    return {
      buffer: this.#getBufferDataView(buffer),
      protocol: this,
      direction,
      command,
      payload
    }
  }

  encode(direction, command, payload) {
    const payloadLength = payload && payload.length ? payload.length : 0
    const length = payloadLength + 9
    const view = new Uint8Array(length)
    view[0] = MSP.START_BYTE
    view[1] = MSPv2.PROTOCOL_ID
    view[2] = direction
    view[3] = 0; // flag: reserved, set to 0
    view[4] = command & 0xFF  // code lower byte
    view[5] = (command & 0xFF00) >> 8 // code upper byte
    view[6] = payloadLength & 0xFF // payloadLength lower byte
    view[7] = (payloadLength & 0xFF00) >> 8 // payloadLength upper byte
    for (let i = 0; i < payloadLength; i++) {
      view[this.#getPayloadOffset() + i] = payload[i]
    }
    view[length - 1] = this.#checksum(command, 0, payload)

    return Buffer.from(view)
  }

  #checksum(command, flags, payload) {
    const payloadLength = payload ? payload.byteLength : 0
    let checksum = 0
    checksum = this.#crc8_dvb_s2(checksum, flags)
    checksum = this.#crc8_dvb_s2(checksum, command & 0xFF)
    checksum = this.#crc8_dvb_s2(checksum, (command & 0xFF00) >> 8)
    checksum = this.#crc8_dvb_s2(checksum, payloadLength & 0xFF)
    checksum = this.#crc8_dvb_s2(checksum, (payloadLength & 0xFF00) >> 8)
    for (let i = 0; i < payloadLength; i++) {
      checksum = this.#crc8_dvb_s2(checksum, payload.getUint8(i))
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

  #getDirection(buffer) {
    return String.fromCharCode(buffer[2])
  }

  #getFlags(buffer) {
    return buffer[3]
  }

  #getCommand(buffer) {
    return buffer[4] | (buffer[5] << 8)
  }

  #getBufferDataView(buffer) {
    return new DataView(new Uint8Array(buffer).buffer)
  }

  #getPayloadOffset(buffer) {
    return MSPv2.decodePayloadOffset(buffer)
  }

  #getPayloadLength(buffer) {
    return MSPv2.decodePayloadLength(buffer)
  }

  #getPayload(buffer) {
    return new DataView(new Uint8Array(buffer).buffer, this.#getPayloadOffset(buffer), this.#getPayloadLength(buffer))
  }

  #getCRC(buffer) {
    return buffer[buffer.length - 1]    
  }
}

readonly(MSPv2, 'PROTOCOL_ID', 'X'.charCodeAt(0))
readonly(MSPv2, 'PROTOCOL_NAME', 'MSPv2')

MSPv2.decodeCommandCode = function(buffer) {
  return getByteAtOffset(buffer, 4) | (getByteAtOffset(buffer, 5) << 8)
}

MSPv2.decodePayloadOffset = function(buffer) {
  return 8
}

MSPv2.decodePayloadLength = function(buffer) {
  return getByteAtOffset(buffer, 6) | (getByteAtOffset(buffer, 7) << 8)
}

MSPv2.decodeExpectedPacketLength = function(buffer) {
  return MSPv2.decodePayloadLength(buffer) + MSPv2.decodePayloadOffset(buffer) + 1
}
