import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_ACC_TRIM = 240

export class AccTrimRequest extends Request {
  constructor() {
    super(MSP_ACC_TRIM)
  }
}

export class AccTrimResponse extends Response {
  get pitch() {
    return this.getInt16(0, true)
  }

  get roll() {
    return this.getInt16(2, true)
  }
}
