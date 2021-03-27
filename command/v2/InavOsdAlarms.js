import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_OSD_ALARMS = 0x2014

export class InavOsdAlarmsRequest extends Request {
  constructor() {
    super(MSP2_INAV_OSD_ALARMS)
  }
}

export class InavOsdAlarmsResponse extends Response {
  get rssi() {
    return this.getUint8(0)
  }

  get time() {
    return this.getUint16(1, true)
  }

  get altitude() {
    return this.getUint16(3, true)
  }

  get distance() {
    return this.getUint16(5, true)
  }

  get negativeAltitude() {
    return this.getUint16(7, true)
  }

  get gForce() {
    return this.getUint16(9, true) / 1000
  }

  get gForceAxisMin() {
    return this.getInt16(11, true) / 1000
  }

  get gForceAxisMax() {
    return this.getInt16(13, true) / 1000
  }

  get current() {
    return this.getUint8(15)
  }

  get imuTemperatureMin() {
    return this.getInt16(16, true) / 10
  }

  get imuTemperatureMax() {
    return this.getInt16(18, true) / 10
  }

  get barometerTemperatureMin() {
    return this.getInt16(20, true) / 10
  }

  get barometerTemperatureMax() {
    return this.getInt16(22, true) / 10
  }
}
