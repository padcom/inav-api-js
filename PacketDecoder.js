import { Transform } from 'stream'
import { MSP } from './protocol/MSP'
import { MSPv1 } from './protocol/MSPv1'
import { MSPv2 } from './protocol/MSPv2'

const PROTOCOL_CLASSES = {
  [MSPv1.PROTOCOL_ID]: MSPv1,
  [MSPv2.PROTOCOL_ID]: MSPv2
}

export class PacketDecoder extends Transform {
  #commandRegistry = null

  constructor(commandRegistry, options) {
    super({ ...options, readableObjectMode: true })
    this.#commandRegistry = commandRegistry
  }

  _transform(chunk, encoding, callback) {
    const ProtocolClass = PROTOCOL_CLASSES[MSP.decodeProtocolCode(chunk)]
    const command = ProtocolClass.decodeCommandCode(chunk)
    const ResponseClass = this.#commandRegistry.getCommandByCode(command).response
    const protocol = new ProtocolClass()
    const response = new ResponseClass(protocol, chunk)
    callback(null, response)
  }
}
