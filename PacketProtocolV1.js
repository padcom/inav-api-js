import { PacketProtocol, symbols } from './PacketProtocol.js'

export class PacketProtocolV1 extends PacketProtocol {
  decode(buffer) {
    const version = this.#getProtocolVersion(buffer)
    if (version !== symbols.PROTO_V1) {
      throw new Error('Packet is not MSP V1')
    }

    const direction = this.#getDirection(buffer)
    const payloadLength = this.#getPayloadLength(buffer)
    const command = this.#getCommand(buffer)
    const payload = this.#getPayload(buffer)
    const crc = this.#getCRC(buffer)

    if (this.#checksum(buffer) !== crc) {
      throw new Error('Invalid CRC')
    }

    return {
      buffer: this.#getBufferDataView(buffer),
      protocolVersion: version,
      direction,
      command,
      crc,
      payloadLength,
      payload
    }
  }

  encode(code, payload) {
    // TODO: Error if code is < 255 and MSPv1 is requested
    const payloadLength = payload && payload.length ? payload.length : 0;
    const length = payloadLength + 6;
    const view = new Uint8Array(length);
    view[0] = symbols.BEGIN;
    view[1] = symbols.PROTO_V1;
    view[2] = symbols.TO_MWC;
    view[3] = payloadLength;
    view[4] = code;
    for (let i = 0; i < payloadLength; i++) {
        view[i + 5] = payload[i];
    }
    view[length-1] = this.#checksum(view);

    return Buffer.from(view)
  }

  #getBufferDataView(buffer) {
    return new DataView(new Uint8Array(buffer).buffer)
  }

  #getProtocolVersion(buffer) {
    return buffer[1]
  }

  #getCommand(buffer) {
    return buffer[4]
  }

  #getDirection(buffer) {
    return String.fromCharCode(buffer[2])    
  }

  #getPayloadLength(buffer) {
    return buffer[3]
  }

  #getPayload(buffer) {
    return new DataView(new Uint8Array(buffer).buffer, 5, this.#getPayloadLength(buffer))
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
