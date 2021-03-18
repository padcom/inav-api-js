import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_MOTOR = 104

export class MotorRequest extends Request {
  constructor() {
    super(MSP_MOTOR)
  }
}

export class MotorResponse extends Response {
  get count() {
    return this.payload.byteLength / 2
  }

  get motor() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint16(i * 2, true))
    }
    return result
  }
}
