import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_MOTOR_PINS = 115

export class MotorPinsRequest extends Request {
  constructor() {
    super(MSP_MOTOR_PINS)
  }
}

export class MotorPinsResponse extends Response {
  get count() {
    return this.payload.byteLength
  }

  get motor() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint8(i))
    }
    return result
  }
}
