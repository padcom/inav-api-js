import { Request } from './Request.js'

import { MSP_CODES } from './msp-codes.js'

export class RawIMURequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_CODES.MSP_RAW_IMU)
  }
}
