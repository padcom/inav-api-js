import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_DATAFLASH_SUMMARY = 70

export class DataFlashSummaryRequest extends Request {
  constructor() {
    super(MSP_DATAFLASH_SUMMARY)
  }
}

export class DataFlashSummaryResponse extends Response {
  get isSupportedByFirmware() {
    return this.payload.byteLength >= 13
  }

  get flags() {
    return this.isSupportedByFirmware ? 0 : this.getUint8(0)
  }

  get ready() {
    return (this.flags & 1) != 0
  }

  get supported() {
    return (this.flags & 1) != 0
  }

  get sectors() {
    return this.isSupportedByFirmware ? this.getUint32(1, true) : 0
  }

  get totalSize() {
    return this.isSupportedByFirmware ? this.getUint32(5, true) : 0
  }

  get usedSize() {
    return this.isSupportedByFirmware ? this.getUint32(9, true) : 0
  }
}
