import { hex } from './utils'

export class Request {
  constructor(command) {
    this.command = command
  }

  get payload() {
    return []
  }

  toString() {
    const payload = this.payload.length > 0 ? `, payload: ${this.payload.length}` : ''
    const parts = [
      this.constructor.name,
      `(command: ${hex(this.command, 4)}/${this.command}${payload})`
    ]
    if (this.payload.length > 0) {
      parts.push(`{\n  ${JSON.stringify(this.payload)}\n}`)
    }
    return parts.join(' ')
  }
}
