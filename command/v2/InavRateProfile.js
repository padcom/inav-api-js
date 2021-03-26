import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_RATE_PROFILE = 0x2007

export class InavRateProfileRequest extends Request {
  constructor() {
    super(MSP2_INAV_RATE_PROFILE)
  }
}

export class InavRateProfileResponse extends Response {
  get throttleRcMid8() {
    return this.getUint8(0)
  }

  get throttleRcExpo8() {
    return this.getUint8(1)
  }

  get throttleDynPid() {
    return this.getUint8(2)
  }

  get throttlePaBreakpoint() {
    return this.getUint16(3, true)
  }

  get stabilizedRcExpo8() {
    return this.getUint8(5)
  }

  get stabilizedYawExpo8() {
    return this.getUint8(6)
  }

  get stabilizedRates() {
    return {
      roll: this.getUint8(7),
      pitch: this.getUint8(8),
      yaw: this.getUint8(9)
    }
  }

  get manualRcExpo8() {
    return this.getUint8(10)
  }

  get manualYawExpo8() {
    return this.getUint8(11)
  }

  get manualRates() {
    return {
      roll: this.getUint8(12),
      pitch: this.getUint8(13),
      yaw: this.getUint8(14)
    }
  }
}
