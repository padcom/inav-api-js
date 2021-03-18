import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_BOXIDS = 119

export class BoxIDsRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_BOXIDS)
  }
}

export class BoxIDsResponse extends Response {
  get count() {
    return this.payloadLength
  }

  get motor() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint8(i, true))
    }
    return result
  }
}
