export class Request {
  constructor(protocol, code) {
    this.protocol = protocol
    this.code = code
    this.data = null
  }

  encode() {
    return this.protocol.encode(this.code, this.data)
  }
}
