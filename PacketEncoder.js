import { Transform } from 'stream'
import { MSP } from './MSP'

export class PacketEncoder extends Transform {
  #protocol = null

  constructor(protocol, options = {}) {
    super({ ...options, writableObjectMode: true })
    this.#protocol = protocol
  }

  _transform(request, encoding, callback) {
    const command = this.#protocol.encode(MSP.DIRECTION_TO_MSC, request.command, request.payload)
    return callback(null, command)
  }
}
