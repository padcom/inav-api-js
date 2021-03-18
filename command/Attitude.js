import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_ATTITUDE = 109

export class AttitudeRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_ATTITUDE)
  }
}

export class AttitudeResponse extends Response {
  get kinematics() {
    return [
      this.getInt16(0, true) / 10.0, // x
      this.getInt16(2, true) / 10.0, // y
      this.getInt16(4, true), // z
    ]
  }
}
