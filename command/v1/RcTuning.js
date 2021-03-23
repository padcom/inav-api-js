import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_RC_TUNING = 111

export class RcTuningRequest extends Request {
  constructor() {
    super(MSP_RC_TUNING)
  }
}

export class RcTuningResponse extends Response {
  get rate() {
    return parseFloat((this.getUint8(0) / 100).toFixed(2))
  }

  get expo() {
    return parseFloat((this.getUint8(1) / 100).toFixed(2))
  }

  get rollPitchRate() {
    return 0
  }

  get rollRate() {
    return parseFloat((this.getUint8(2) * 10))
  }

  get pitchRate() {
    return parseFloat((this.getUint8(3) * 10))
  }

  get yawRate() {
    return parseFloat((this.getUint8(4) * 10))
  }

  get dynamicThrottlePID() {
    return parseInt(this.getUint8(4))
  }

  get throttleMiddle() {
    return parseFloat((this.getUint8(5) / 100).toFixed(2))
  }

  get throttleExpo() {
    return parseFloat((this.getUint8(6) / 100).toFixed(2))
  }

  get dynamicThrottleBreakpoint() {
    return this.getUint16(7, true)
  }

  get yawExpo() {
    return parseFloat((this.getUint8(9) / 100).toFixed(2))
  }
}
