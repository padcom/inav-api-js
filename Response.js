import { getObjectPropertyNames, readonly, hex } from './utils'

export class Response {
  constructor(protocol, buffer) {
    const decoded = protocol.decode(buffer)
    Object.keys(decoded).forEach(key => {
      readonly(this, key, decoded[key])
    })
  }

  toString() {
    const protocol = this.protocol.constructor.PROTOCOL_ID
    const protocolName = this.protocol.constructor.PROTOCOL_NAME
    const command = this.command
    const plLen = this.payload.byteLength
    const properties = this.getToStringContent()

    return `${this.constructor.name} (protocol: ${hex(protocol)}/${protocolName}, command: ${hex(command)}, payload: ${hex(plLen)} bytes) ${properties}`
  }

  getToStringContent() {
    const content = getObjectPropertyNames(this)
      .map(prop => `  ${prop} = ${this[prop]}`)
      .join('\n')

    if (content !== '') return `{\n${content}\n}`
    else return ''
  }

  getInt8(offset, ...args) {
    return this.payload.byteLength - 1 >= offset ? this.payload.getInt8(offset, ...args) : undefined
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
}
