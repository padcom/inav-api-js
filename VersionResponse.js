import { Response } from './Response.js'

export class VersionResponse extends Response {
  get version() {
    return `${this.getUint8(0)}.${this.getUint8(1)}.0`
  }
}
