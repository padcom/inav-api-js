import { Request } from './Request.js'

import { MSP_CODES } from './msp-codes.js'

export class SensorStatusRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_CODES.MSP_SENSOR_STATUS)
  }
}
