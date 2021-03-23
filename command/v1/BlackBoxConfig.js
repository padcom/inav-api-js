import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_BLACKBOX_CONFIG = 80

export class BlackBoxConfigRequest extends Request {
  constructor() {
    super(MSP_BLACKBOX_CONFIG)
  }
}

export class BlackBoxConfigResponse extends Response {
  get flags() {
    return this.getUint8(0)
  }

  get supported() {
    return (this.flags & 0x01) != 0
  }

  get device() {
    return this.getUint8(1)
  }

  get rateNum() {
    return this.getUint8(2)
  }

  get rateDenom() {
    return this.getUint8(3)
  }
}
