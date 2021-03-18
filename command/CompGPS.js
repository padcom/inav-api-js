import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_COMP_GPS = 107

export class CompGPSRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_COMP_GPS)
  }
}

export class CompGPSResponse extends Response {
  get distanceToHome() {
    return this.getUint16(0, 1)
  }

  get directionToHome() {
    return this.getUint16(2, 1)
  }

  get update() {
    return this.getUint8(4)
  }
}
