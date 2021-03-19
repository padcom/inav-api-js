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

export class PacketDecoderTransform extends Transform {
  #state = STATE_START
  #buffer = null
  #commandRegistry = null
  #ProtocolClass = null

  constructor(commandRegistry, options) {
    super({ ...options, readableObjectMode: true })
    this.#commandRegistry = commandRegistry
  }

  _transform(chunk, encoding, callback) {
    if (this.#state === STATE_START) {
      this.#start(chunk, callback)
    } else if (this.#state === STATE_CONTINUE_READING_DATA) {
      this.#more(chunk, callback)
    } else {
      this.#state = STATE_START
      this.#buffer = null
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

    this.#buffer = chunk
    if (this.#ProtocolClass.decodeExpectedPacketLength(this.#buffer) === this.#buffer.byteLength) {
      this.#done(callback)
    } else {
      this.#state = STATE_CONTINUE_READING_DATA
      return callback()
    }
  }

  #more(chunk, callback) {
    this.#buffer = Buffer.concat([ this.#buffer, chunk ])
    if (this.#ProtocolClass.decodeExpectedPacketLength(this.#buffer) === this.#buffer.length) {
      this.#state = STATE_START
      this.#done(callback)
    } else {
      return callback()
    }
  }

  #done(callback) {
    const command = this.#ProtocolClass.decodeCommandCode(this.#buffer)
    const ResponseClass = this.#commandRegistry.getCommandByCode(command).response
    const protocol = new this.#ProtocolClass()
    const response = new ResponseClass(protocol, this.#buffer)
    this.#buffer = null
    callback(null, response)
  }
}
