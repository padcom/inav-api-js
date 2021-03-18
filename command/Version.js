import { Request } from '../Request.js'
import { Response } from '../Response.js'

export class VersionRequest extends Request {
  constructor(protocol) {
    super(protocol, 1)
  }
}

export class VersionResponse extends Response {
  get version() {
    return `${this.getUint8(0)}.${this.getUint8(1)}.0`
  }
}
