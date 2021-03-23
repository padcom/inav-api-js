import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_SENSOR_STATUS = 151

export class SensorStatusRequest extends Request {
  constructor() {
    super(MSP_SENSOR_STATUS)
  }
}

export class SensorStatusResponse extends Response {
  get isHardwareHealthy() {
    return this.getUint8(0)
  }

  get gyroHwStatus() {
    return this.getUint8(1)
  }

  get accHwStatus() {
    return this.getUint8(2)
  }

  get magHwStatus() {
    return this.getUint8(3)
  }

  get baroHwStatus() {
    return this.getUint8(4)
  }

  get gpsHwStatus() {
    return this.getUint8(5)
  }

  get rangeHwStatus() {
    return this.getUint8(6)
  }

  get speedHwStatus() {
    return this.getUint8(7)
  }

  get flowHwStatus() {
    return this.getUint8(8)
  }
}
