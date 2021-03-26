import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_MC_BRAKING = 0x200B

export class InavMcBrakingRequest extends Request {
  constructor() {
    super(MSP2_INAV_MC_BRAKING)
  }
}

export class InavMcBrakingResponse extends Response {
  get speedThreshold() {
    return this.getUint16(0, true)
  }

  get disengageSpeed() {
    return this.getUint16(2, true)
  }

  get timeout() {
    return this.getUint16(4, true)
  }

  get boostFactor() {
    return this.getUint8(6)
  }

  get boostTimeout() {
    return this.getUint16(7, true)
  }

  get boostSpeedThreshold() {
    return this.getUint16(9, true)
  }

  get boostDisengageSpeed() {
    return this.getUint16(11, true)
  }

  get bankAngle() {
    return this.getUint8(13)
  }
}
