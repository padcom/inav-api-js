import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_SONAR = 58

export class SonarRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_SONAR)
  }
}

export class SonarResponse extends Response {
  get sonar() {
    return this.getInt32(0, true)
  }
}
