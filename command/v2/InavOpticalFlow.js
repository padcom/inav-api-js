import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_OPTICAL_FLOW = 0x2001

export class InavOpticalFlowRequest extends Request {
  constructor() {
    super(MSP2_INAV_OPTICAL_FLOW)
  }
}

export class InavOpticalFlowResponse extends Response {
  get rawQuality() {
    return this.getUint8(0)
  }

  get flowRate() {
    return {
      x: this.getUint16(1, true),
      y: this.getUint16(3, true)
    }
  }

  get bodyRate() {
    return {
      x: this.getUint16(5, true),
      y: this.getUint16(7, true)
    }
  }
}
