import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_RTC = 246

export class RtcRequest extends Request {
  constructor() {
    super(MSP_RTC)
  }
}

export class RtcResponse extends Response {
  get supported() {
    return this.payload.byteLength >= 6
  }

  get seconds() {
    return this.supported ? this.getInt32(0, true) : undefined
  }

  get millis() {
    return this.supported ? this.getUint16(4, true) : undefined
  }
}
