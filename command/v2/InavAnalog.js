import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_ANALOG = 0x2002

export class InavAnalogRequest extends Request {
  constructor() {
    super(MSP2_INAV_ANALOG)
  }
}

export class InavAnalogResponse extends Response {
  get flags() {
    return this.getUint8(0)
  }

  get batteryVoltage() {
    return this.getUint16(1, true)
  }

  get amperage() {
    return this.getUint16(3, true)
  }

  get power() {
    return this.getUint32(5, true)
  }

  get mAhDrawn() {
    return this.getUint32(9, true)
  }

  get mWhDrawn() {
    return this.getUint32(13, true)
  }

  get batteryRemainingCapacity() {
    return this.getUint32(17, true)
  }

  get batteryPercentage() {
    return this.getUint8(18)
  }

  get rssi() {
    return this.getUint16(18, true)
  }
}
