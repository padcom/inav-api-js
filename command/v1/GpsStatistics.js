import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_GPSStatistics = 166

export class GpsStatisticsRequest extends Request {
  constructor() {
    super(MSP_GPSStatistics)
  }
}

export class GpsStatisticsResponse extends Response {
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
