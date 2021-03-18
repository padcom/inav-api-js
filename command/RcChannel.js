import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_RC = 105

export class RcChannelRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_RC)
  }
}

export class RcChannelResponse extends Response {
  get count() {
    return this.payloadLength / 2
  }

  get channel() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint16(i * 2, true))
    }
    return result
  }
}
