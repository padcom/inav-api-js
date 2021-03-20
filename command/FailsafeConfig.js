import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_FAILSAFE_CONFIG = 75

export class FailsafeConfigRequest extends Request {
  constructor() {
    super(MSP_FAILSAFE_CONFIG)
  }
}

export class FailsafeConfigResponse extends Response {
  get delay() {
    return this.getUint8(0)
  }

  get offDelay() {
    return this.getUint8(1)
  }

  get throttle() {
    return this.getUint16(2, true)
  }

  get killSwitch() {
    return this.getUint8(4)
  }

  get throttleLowDelay() {
    return this.getUint16(5, true)
  }

  get procedure() {
    return this.getUint8(7)
  }

  get recoveryDelay() {
    return this.getUint8(8)
  }

  get fwRollAngle() {
    return this.getUint16(9, true)
  }

  get fwPitchAngle() {
    return this.getUint16(11, true)
  }

  get fwYawRate() {
    return this.getUint16(13, true)
  }

  get stickMotionThreshold() {
    return this.getUint16(15, true)
  }

  get minDistance() {
    return this.getUint16(17, true)
  }

  get failsafeMinDistanceProcedure() {
    return this.getUint8(19)
  }
}
