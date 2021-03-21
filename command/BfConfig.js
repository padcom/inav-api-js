import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_BF_CONFIG = 66

export class BfConfigRequest extends Request {
  constructor() {
    super(MSP_BF_CONFIG)
  }
}

export class BfConfigResponse extends Response {
  get mixerConfiguration() {
    return this.getUint8(0)
  }

  get features() {
    return this.getUint32(1, true)
  }

  get serialRxType() {
    return this.getUint8(5)
  }

  get boardAlignRoll() {
    return this.getInt16(6, true); // -180 - 36
  }

  get boardAlignPitch() {
    return this.getInt16(8, true); // -180 - 36
  }

  get boardAlignYaw() {
    return this.getInt16(10, true); // -180 - 36
  }

  get currentScale() {
    return this.getInt16(12, true)
  }

  get currentOffset() {
    return this.getInt16(14, true)
  }
}
