import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_COMP_GPS = 107

export class CompGpsRequest extends Request {
  constructor() {
    super(MSP_COMP_GPS)
  }
}

export class CompGpsResponse extends Response {
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
