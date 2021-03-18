export class Request {
  constructor(protocol, command) {
    this.protocol = protocol
    this.command = command
    this.data = null
  }

  encode() {
    return this.protocol.encode(this.command, this.data)
  }
}
