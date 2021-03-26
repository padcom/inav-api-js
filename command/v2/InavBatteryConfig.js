import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_BATTERY_CONFIG = 0x2005

export class InavBatteryConfigRequest extends Request {
  constructor() {
    super(MSP2_INAV_BATTERY_CONFIG)
  }
}

export class InavBatteryConfigResponse extends Response {
  get voltageScale() {
    return this.getUint16(0, true)
  }

  get voltageSource() {
    return this.getUint8(2)
  }

  get cells() {
    return this.getUint8(3)
  }

  get cellDetect() {
    return this.getUint16(4, true)
  }

  get cellMin() {
    return this.getUint16(6, true)
  }

  get cellMax() {
    return this.getUint16(8, true)
  }

  get cellWarning() {
    return this.getUint16(10, true)
  }

  get currentOffset() {
    return this.getUint16(12, true)
  }

  get currentScale() {
    return this.getUint16(14, true)
  }

  get capacity() {
    return this.getUint32(16, true)
  }

  get capacityWarning() {
    return this.getUint32(20, true)
  }

  get capacityCritical() {
    return this.getUint32(24, true)
  }

  get capacityUnit() {
    return this.getUint8(28)
  }
}
