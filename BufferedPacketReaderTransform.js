import { Transform } from 'stream'
import { MSP } from './MSP'
import { MSPv1 } from './MSPv1'
import { MSPv2 } from './MSPv2'

const PROTOCOL_CLASSES = {
  [MSPv1.PROTOCOL_ID]: MSPv1,
  [MSPv2.PROTOCOL_ID]: MSPv2
}

const STATE_START = 0
const STATE_CONTINUE_READING_DATA = 1

export class BufferedPacketReaderTransform extends Transform {
  #state = STATE_START
  #buffer = null
  #ProtocolClass = null

  _transform(chunk, encoding, callback) {
    if (this.#state === STATE_START) {
      this.#start(chunk, callback)
    } else if (this.#state === STATE_CONTINUE_READING_DATA) {
      this.#more(chunk, callback)
    } else {
      this.#state = STATE_START
      this.#buffer = null
      callback()
    }
  }

  #start(chunk, callback) {
    if (MSP.decodeStartCode(chunk) !== MSP.START_BYTE) {
      return callback()
    }

    this.#ProtocolClass = PROTOCOL_CLASSES[MSP.decodeProtocolCode(chunk)]
    if (!this.#ProtocolClass) {
      return callback()
    }

    if (this.#ProtocolClass.decodeExpectedPacketLength(chunk) === chunk.byteLength) {
      callback(null, chunk)
    } else {
      this.#buffer = chunk
      this.#state = STATE_CONTINUE_READING_DATA
      return callback()
    }
  }

  #more(chunk, callback) {
    this.#buffer = Buffer.concat([ this.#buffer, chunk ])
    if (this.#ProtocolClass.decodeExpectedPacketLength(this.#buffer) === this.#buffer.length) {
      this.#state = STATE_START
      callback(null, this.#buffer)
      this.#buffer = null
    } else {
      return callback()
    }
  }
}
