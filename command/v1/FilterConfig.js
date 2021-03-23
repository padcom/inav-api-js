import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_FILTER_CONFIG = 92

export class FilterConfigRequest extends Request {
  constructor() {
    super(MSP_FILTER_CONFIG)
  }
}

export class FilterConfigResponse extends Response {
  get gyroSoftLpfHz() {
    return this.getUint8(0)
  }

  get dtermLpfHz() {
    return this.getUint16(1, true)
  }

  get yawLpfHz() {
    return this.getUint16(3, true)
  }

  get gyroNotchHz1() {
    return this.getUint16(5, true)
  }

  get gyroNotchCutoff1() {
    return this.getUint16(7, true)
  }

  get dtermNotchHz() {
    return this.getUint16(9, true)
  }

  get dtermNotchCutoff() {
    return this.getUint16(11, true)
  }

  get gyroNotchHz2() {
    return this.getUint16(13, true)
  }

  get gyroNotchCutoff2() {
    return this.getUint16(15, true)
  }

  get accNotchHz() {
    return this.getUint16(17, true)
  }

  get accNotchCutoff() {
    return this.getUint16(19, true)
  }

  get gyroStage2LowpassHz() {
    return this.getUint16(21, true)
  }
}
