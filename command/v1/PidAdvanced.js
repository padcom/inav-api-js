import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_PID_ADVANCED = 94

export class PidAdvancedRequest extends Request {
  constructor() {
    super(MSP_PID_ADVANCED)
  }
}

export class PidAdvancedResponse extends Response {
  get rollPitchItermIgnoreRate() {
    return this.getUint16(0, true)
  }

  get yawItermIgnoreRate() {
    return this.getUint16(2, true)
  }

  get yawPLimit() {
    return this.getUint16(4, true)
  }

  get dtermSetpointWeight() {
    return this.getUint8(9)
  }

  get pidSumLimit() {
    return this.getUint16(10, true)
  }

  get axisAccelerationLimitRollPitch() {
    return this.getUint16(13, true)
  }

  get axisAccelerationLimitYaw() {
    return this.getUint16(15, true)
  }

}
