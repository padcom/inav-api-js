import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SDCARD_SUMMARY = 79

export class SdCardSummaryRequest extends Request {
  constructor() {
    super(MSP_SDCARD_SUMMARY)
  }
}

export class SdCardSummaryResponse extends Response {
  get flags() {
    return this.getUint8(0)
  }

  get supported() {
    return (this.flags & 0x01) != 0
  }

  get state() {
    return this.getUint8(1)
  }

  get filesystemLastError() {
    return this.getUint8(2)
  }

  get freeSizeKB() {
    return this.getUint32(3, true)
  }

  get totalSizeKB() {
    return this.getUint32(7, true)
  }
}
