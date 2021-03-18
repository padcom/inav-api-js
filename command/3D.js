import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_3D = 124

export class ThreeDeeRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_3D)
  }
}

export class ThreeDeeResponse extends Response {
  get deadbandLow() {
    return this.getUint16(0, true)
  }

  get deadbandHigh() {
    return this.getUint16(2, true)
  }

  get neutral() {
    return this.getUint16(4, true)
  }
}
