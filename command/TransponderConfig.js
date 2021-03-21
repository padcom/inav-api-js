import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_TRANSPONDER_CONFIG = 82

export class TransponderConfigRequest extends Request {
  constructor() {
    super(MSP_TRANSPONDER_CONFIG)
  }
}

export class TransponderConfigResponse extends Response {
  get flags() {
    return this.getUint8(0)
  }

  get supported() {
    return (this.flags & 0x01) != 0
  }

  get data() {
    return this.getUint8Array(1)
  }
}
