import { Request } from '../Request.js'
import { Response } from '../Response.js'
import { getKeyForValue } from '../utils.js'

export const MSP_PID = 112

export class PIDRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_PID)
  }
}

export class PIDResponse extends Response {
  get count() {
    return this.payloadLength / 3
  }

  get pid() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push([
        this.getUint8(i * 3, true),
        this.getUint8(i * 3 + 1, true),
        this.getUint8(i * 3 + 2, true)
      ])
      result.push(this.getUint16(i * 2, true))
    }
    return result
  }
}