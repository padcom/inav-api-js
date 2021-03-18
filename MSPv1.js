import { MSP } from './MSP'
import { readonly, hex, getByteAtOffset } from './utils'

export class MSPv1 extends MSP {
  decode(buffer) {
    const begin = MSP.decodeStartCode(buffer)
    if (begin !== MSP.START_BYTE) {
      throw new Error(`Invalid start byte ${hex(buffer[0])}`)
    }

    const version = MSP.decodeProtocolCode(buffer)
    if (version !== MSPv1.PROTOCOL_ID) {
      throw new Error('Packet is not MSP V1')
    }

    const direction = this.#getDirection(buffer)
    const command = this.#getCommand(buffer)
    const payload = this.#getPayload(buffer)
    const crc = this.#getCRC(buffer)

    if (this.#checksum(buffer) !== crc) {
      throw new Error('Invalid CRC')
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
    // TODO: Error if code is < 255 and MSPv1 is requested
    const payloadLength = payload && payload.length ? payload.length : 0;
    const length = payloadLength + 6;
    const view = new Uint8Array(length);
    view[0] = MSP.START_BYTE;
    view[1] = MSPv1.PROTOCOL_ID
    view[2] = direction;
    view[3] = payloadLength;
    view[4] = command;
    for (let i = 0; i < payloadLength; i++) {
        view[i + 5] = payload[i];
    }
    view[length-1] = this.#checksum(view);

    return Buffer.from(view)
  }

  #getCommand(buffer) {
    return buffer[4]
  }

  #getDirection(buffer) {
    return String.fromCharCode(buffer[2])    
  }

  #getBufferDataView(buffer) {
    return new DataView(new Uint8Array(buffer).buffer)
  }

  #getPayloadOffset(buffer) {
    return MSPv1.decodePayloadOffset(buffer)
  }

  #getPayloadLength(buffer) {
    return MSPv1.decodePayloadLength(buffer)
  }

  #getPayload(buffer) {
    return new DataView(new Uint8Array(buffer).buffer, this.#getPayloadOffset(buffer), this.#getPayloadLength(buffer))
  }

  #getCRC(buffer) {
    return buffer[buffer.length - 1]    
  }

  #checksum(buffer) {
    let checksum = buffer[3]
    for (let i = 4; i < buffer.length - 1; i++) {
      checksum ^= buffer[i];
    }

    return checksum;
  }
}

readonly(MSPv1, 'PROTOCOL_ID', 'M'.charCodeAt(0))

MSPv1.decodeCommandCode = function(buffer) {
  return getByteAtOffset(buffer, 4)
}

MSPv1.decodePayloadOffset = function(buffer) {
  return getByteAtOffset(buffer, 3) === 0xFF ? 7 : 5
  }

MSPv1.decodePayloadLength = function(buffer) {
  if (getByteAtOffset(buffer, 3) !== 0xFF) {
    return getByteAtOffset(buffer, 3)
  } else {
    return getByteAtOffset(buffer, 5) | (getByteAtOffset(buffer, 6) << 8)
  }
}

MSPv1.decodeExpectedPacketLength = function(buffer) {
  return MSPv1.decodePayloadLength(buffer) + MSPv1.decodePayloadOffset(buffer) + 1
}
