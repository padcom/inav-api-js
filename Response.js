import { readonly, hex } from './utils.js'

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
    const command = this.command
    const plLen = this.payloadLength
    const properties = this.#getToStringContent()

    return `${this.constructor.name} (protocol: ${hex(protocol)}/${protocolName}, command: ${hex(command)}, payload: ${hex(plLen)} bytes) ${properties}`
  }

  getInt8(offset, ...args) {
    return this.payload.byteLength - 1 >= offset ? this.payload.getint8(offset, ...args) : undefined
  }

  getUint8(offset, ...args) {
    return this.payload.byteLength - 1 >= offset ? this.payload.getUint8(offset, ...args) : undefined
  }

  getInt16(offset, ...args) {
    return this.payload.byteLength - 2 >= offset ? this.payload.getInt16(offset, ...args) : undefined
  }

  getUint16(offset, ...args) {
    return this.payload.byteLength - 2 >= offset ? this.payload.getUint16(offset, ...args) : undefined
  }

  getInt32(offset, ...args) {
    return this.payload.byteLength - 4 >= offset ? this.payload.getInt32(offset, ...args) : undefined
  }

  getUint32(offset, ...args) {
    return this.payload.byteLength - 4 >= offset ? this.payload.getUint32(offset, ...args) : undefined
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
