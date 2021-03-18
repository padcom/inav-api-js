import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_ARMING_CONFIG = 61

export class ArmingConfigRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_ARMING_CONFIG)
  }
}

export class ArmingConfigResponse extends Response {
  get auto_disarm_delay() {
    return this.getUint8(0)
  }

  get disarm_kill_switch() {
    return this.getUint8(1)
  }
}
