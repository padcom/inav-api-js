import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_ANALOG = 110

export class AnalogRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_ANALOG)
  }
}

export class AnalogResponse extends Response {
  get voltage() {
    return this.getUint8(0) / 10.0 // V
  }

  get mAhdrawn() {
    return this.getUint16(1, true) // mAh
  }

  get rssi() {
    return this.getUint16(3, true) // 0-1023
  }

  get amperage() {
    return this.getInt16(5, true) / 100 // A
  }
}