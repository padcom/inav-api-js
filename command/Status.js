import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_STATUS = 101

export class StatusRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_STATUS)
  }
}

export class StatusResponse extends Response {
  get cycleTime() {
    return this.getUint16(0, true)
  }

  get i2cError() {
    return this.getUint16(2, true)
  }

  get activeSensors() {
    return this.getUint16(4, true)
  }

  get mode() {
    return this.getUint32(6, true)
  }

  get profile() {
    return this.getUint8(10)
  }
}
