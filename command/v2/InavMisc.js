import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_MISC = 0x2003

export class InavMiscRequest extends Request {
  constructor() {
    super(MSP2_INAV_MISC)
  }
}

export class InavMiscResponse extends Response {
  get pwmRangeMiddle() {
    return this.getUint16(0, true)
  }

  get maxThrottle() {
    return this.getUint16(2, true)
  }

  get minCommand() {
    return this.getUint16(4, true)
  }

  get failsafeThrottle() {
    return this.getUint16(6, true)
  }

  get gpsProvider() {
    return this.getUint8(8)
  }

  get gpsBaudrate() {
    return this.getUint8(9)
  }

  get gpsSbasMode() {
    return this.getUint8(10)
  }

  get rssiChannel() {
    return this.getUint8(11)
  }

  get magDeclination() {
    return this.getUint16(12, true)
  }

  get voltageScale() {
    return this.getUint16(16, true)
  }

  get voltageSource() {
    return this.getUint8(18)
  }

  get cells() {
    return this.getUint8(19)
  }

  get cellDetect() {
    return this.getUint16(20, true)
  }

  get cellMin() {
    return this.getUint16(22, true)
  }

  get cellMax() {
    return this.getUint16(24, true)
  }

  get cellWarning() {
    return this.getUint16(26, true)
  }

  get capacity() {
    return this.getUint32(28, true)
  }

  get capacityWarning() {
    return this.getUint32(32, true)
  }

  get capacityCritical() {
    return this.getUint32(36, true)
  }

  get capacityUnit() {
    return this.getUint8(40)
  }
}
