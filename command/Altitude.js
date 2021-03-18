import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_ALTITUDE = 108

export class AltitudeRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_ALTITUDE)
  }
}

export class AltitudeResponse extends Response {
  get altitude() {
    return parseFloat((this.getInt32(0, true) / 100.0).toFixed(2)) // correct scale factor
  }

  get barometer() {
    return parseFloat((this.getInt32(6, true) / 100.0).toFixed(2)) // correct scale factor
  }
}
