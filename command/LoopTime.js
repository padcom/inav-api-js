import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_LOOP_TIME = 73

export class LoopTimeRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_LOOP_TIME)
  }
}

export class LoopTimeResponse extends Response {
  get loopTime() {
    return this.getInt16(0, true)
  }
}
