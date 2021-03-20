import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_RTH_AND_LAND_CONFIG = 21

export class RthAndLandConfigRequest extends Request {
  constructor() {
    super(MSP_RTH_AND_LAND_CONFIG)
  }
}

export class RthAndLandConfigResponse extends Response {
  get minRthDistance() {
    return this.getUint16(0, true)
  }

  get rthClimbFirst() {
    return this.getUint8(2)
  }

  get rthClimbIgnoreEmergency() {
    return this.getUint8(3)
  }

  get rthTailFirst() {
    return this.getUint8(4)
  }

  get rthAllowLanding() {
    return this.getUint8(5)
  }

  get rthAltControlMode() {
    return this.getUint8(6)
  }

  get rthAbortThreshold() {
    return this.getUint16(7, true)
  }

  get rthAltitude() {
    return this.getUint16(9, true)
  }

  get landDescentRate() {
    return this.getUint16(11, true)
  }

  get landSlowdownMinAlt() {
    return this.getUint16(13, true)
  }

  get landSlowdownMaxAlt() {
    return this.getUint16(15, true)
  }

  get emergencyDescentRate() {
    return this.getUint16(17, true)
  }
}
