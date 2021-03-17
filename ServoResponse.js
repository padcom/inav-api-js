import { Response } from './Response.js'

export class ServoResponse extends Response {
  get count() {
    return this.payloadLength / 2
  }

  get servo() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint16(i * 2, true))
    }
    return result
  }
}
