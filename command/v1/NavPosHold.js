import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_NAV_POSHOLD = 12

export class NavPosHoldRequest extends Request {
  constructor() {
    super(MSP_NAV_POSHOLD)
  }
}

export class NavPosHoldResponse extends Response {
  get userControlMode() {
    return this.getUint8(0)
  }

  get maxSpeed() {
    return this.getUint16(1, true)
  }

  get maxClimbRate() {
    return this.getUint16(3, true)
  }

  get maxManualSpeed() {
    return this.getUint16(5, true)
  }

  get maxManualClimbRate() {
    return this.getUint16(7, true)
  }

  get maxBankAngle() {
    return this.getUint8(9)
  }

  get useThrottleMidForAlthold() {
    return this.getUint8(10)
  }

  get hoverThrottle() {
    return this.getUint16(11, true)
  }
}
