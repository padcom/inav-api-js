import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_WP = 118

export class WPRequest extends Request {
  constructor() {
    super(MSP_WP)
  }
}

export class WPResponse extends Response {
  get number() {
    return this.getUint8(0)
  }

  get action() {
    return this.getUint8(1)
  }

  get lat() {
    return this.getInt32(2, true) / 10000000
  }

  get lon() {
    return this.getInt32(6, true) / 10000000
  }

  get alt() {
    return this.getInt32(10, true)
  }

  get p1() {
    return this.getInt16(14, true)
  }
}
