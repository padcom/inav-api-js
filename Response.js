import { PacketProtocol } from './PacketProtocol.js'

function readonly(object, field, value) {
  Object.defineProperty(object, field, {
    get() { return value }
  })
}

export class Response {
  constructor(protocol, buffer) {
    this.protocol = protocol
    const decoded = protocol.decode(buffer)
    Object.keys(decoded).forEach(key => {
      readonly(this, key, decoded[key])
    })
  }

  toString() {
    const PROTOCOL_TO_STRING = {
      0x4d: 'MSPv1'
    }
    const protocol = this.protocolVersion
    const protocolName = PROTOCOL_TO_STRING[protocol] || 'unknown'
    const command = this.command.toString(16)
    const plLen = this.payloadLength
    const properties = this.#getToStringContent()

    return `${this.constructor.name} (protocol: ${protocol.toString(16)}/${protocolName}, command: ${command}, payload: ${plLen} bytes) ${properties}`
  }

  #getToStringContent() {
    const props = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
    const content = props
      .filter(prop => typeof this[prop] !== 'function')
      .map(prop => `  ${prop} = ${this[prop]}`).join('\n')

    if (content !== '') return `{\n${content}\n}`
    else return ''
  }
}
