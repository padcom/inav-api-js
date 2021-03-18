import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_GPSStatistics = 166

export class GPSStatisticsRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_GPSStatistics)
  }
}

export class GPSStatisticsResponse extends Response {
  get messageDt() {
    return this.getUint16(0, true)
  }

  get errors() {
    return this.getUint32(2, true)
  }

  get timeouts() {
    return this.getUint32(6, true)
  }

  get packetCount() {
    return this.getUint32(10, true)
  }

  get hdop() {
    return this.getUint16(14, true)
  }

  get eph() {
    return this.getUint16(16, true)
  }

  get epv() {
    return this.getUint16(18, true)
  }
}
