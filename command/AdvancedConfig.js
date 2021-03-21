import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_ADVANCED_CONFIG = 90

export class AdvancedConfigRequest extends Request {
  constructor() {
    super(MSP_ADVANCED_CONFIG)
  }
}

export class AdvancedConfigResponse extends Response {
  get gyroSyncDenominator() {
    return this.getUint8(0)
  }

  get pidProcessDenom() {
    return this.getUint8(1)
  }

  get useUnsyncedPwm() {
    return this.getUint8(2)
  }

  get motorPwmProtocol() {
    return this.getUint8(3)
  }

  get motorPwmRate() {
    return this.getUint16(4, true)
  }

  get servoPwmRate() {
    return this.getUint16(6, true)
  }

  get gyroSync() {
    return this.getUint8(8)
  }
}
