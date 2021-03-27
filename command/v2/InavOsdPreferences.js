import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_OSD_PREFERENCES = 0x2016

export class InavOsdPreferencesRequest extends Request {
  constructor() {
    super(MSP2_INAV_OSD_PREFERENCES)
  }
}

export class InavOsdPreferencesResponse extends Response {
  get videoSystem() {
    return this.getUint8(0)
  }

  get mainVoltageDecimals() {
    return this.getUint8(1)
  }

  get ahiReverseRoll() {
    return this.getUint8(2)
  }

  get crosshairsStyle() {
    return this.getUint8(3)
  }

  get leftSidebarScroll() {
    return this.getUint8(4)
  }

  get rightSidebarScroll() {
    return this.getUint8(5)
  }

  get sidebarScrollArrows() {
    return this.getUint8(6)
  }

  get units() {
    return this.getUint8(7)
  }

  get statsEnergyUnit() {
    return this.getUint8(8)
  }
}
