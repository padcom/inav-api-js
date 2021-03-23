import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_ARMING_CONFIG = 61

export class ArmingConfigRequest extends Request {
  constructor() {
    super(MSP_ARMING_CONFIG)
  }
}

export class ArmingConfigResponse extends Response {
  get autoDisarmDelay() {
    return this.getUint8(0)
  }

  get disarmKillSwitch() {
    return this.getUint8(1)
  }
}
