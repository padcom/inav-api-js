import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_COMMON_TZ = 0x1001

export class CommonTzRequest extends Request {
  constructor() {
    super(MSP2_COMMON_TZ)
  }
}

export class CommonTzResponse extends Response {
  get offset() {
    return this.getUint16(0, true)
  }

  get automaticDst() {
    return this.getBool8(2)
  }
}
