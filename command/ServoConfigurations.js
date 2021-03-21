import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SERVO_CONFIGURATIONS = 120

export class ServoConfigurationsRequest extends Request {
  constructor() {
    super(MSP_SERVO_CONFIGURATIONS)
  }
}

export class ServoConfigurationsResponse extends Response {
  get count() {
    return this.payload.byteLength / 14
  }

  get servo() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push({
        min: this.getInt16(i * 14 + 0, true),
        max: this.getInt16(i * 14 + 2, true),
        middle: this.getInt16(i * 14 + 4, true),
        rate: this.getInt8(i * 14 + 6),
        indexOfChannelToForward: this.getInt8(i * 14 + 9)
      })
    }
    return result
  }
}
