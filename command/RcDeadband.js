import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_RC_DEADBAND = 125

export class RcDeadbandRequest extends Request {
  constructor() {
    super(MSP_RC_DEADBAND)
  }
}

export class RcDeadbandResponse extends Response {
  get deadband() {
    return this.getUint8(0)
  }

  get yaw() {
    return this.getUint8(1)
  }

  get altHold() {
    return this.getUint8(2)
  }

  get throttle() {
    return this.getUint16(3, true)
  }
}
