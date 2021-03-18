import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_API_VERSION = 1

export class VersionRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_API_VERSION)
  }
}

export class VersionResponse extends Response {
  get version() {
    return `${this.getUint8(0)}.${this.getUint8(1)}.0`
  }
}
