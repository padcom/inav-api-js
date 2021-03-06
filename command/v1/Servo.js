import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_SERVO = 103

export class ServoRequest extends Request {
  constructor() {
    super(MSP_SERVO)
  }
}

export class ServoResponse extends Response {
  get count() {
    return this.payload.byteLength / 2
  }

  get servo() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint16(i * 2, true))
    }
    return result
  }
}
