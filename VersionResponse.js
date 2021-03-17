import { Response } from './Response.js'

export class VersionResponse extends Response {
  get version() {
    return `${this.payload.getUint8(0)}.${this.payload.getUint8(1)}.0`
  }
}
