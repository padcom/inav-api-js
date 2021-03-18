import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_MOTOR = 104

export class MotorRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_MOTOR)
  }
}

export class MotorResponse extends Response {
  get count() {
    return this.payloadLength / 2
  }

  get motor() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint16(i * 2, true))
    }
    return result
  }
}
