import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_LOOP_TIME = 73

export class LoopTimeRequest extends Request {
  constructor() {
    super(MSP_LOOP_TIME)
  }
}

export class LoopTimeResponse extends Response {
  get loopTime() {
    return this.getInt16(0, true)
  }
}
