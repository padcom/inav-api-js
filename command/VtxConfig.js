import { Request } from '../Request'
import { Response } from '../Response'
import { switchKeyValues } from '../utils'

export const MSP_VTX_CONFIG = 88

export class VtxConfigRequest extends Request {
  constructor() {
    super(MSP_VTX_CONFIG)
  }
}

export const VTX_TYPE = {
  DEV_SMARTAUDIO: 3,
  DEV_TRAMP: 4,
  UNKNOWN: 0xFF
}

export const VTX_TYPE_NAME = switchKeyValues(VTX_TYPE)

export const VTX_BAND = {
  1: 'Boscam A',
  2: 'Boscam B',
  3: 'Boscam E',
  4: 'Fatshark',
  5: 'Raceband'
}

export const VTX_BAND_MIN = 1
export const VTX_BAND_MAX = 5
export const VTX_CHANNEL_MIN = 1
export const VTX_CHANNEL_MAX = 8
export const VTX_LOW_POWER_DISARM_MIN = 0
export const VTX_LOW_POWER_DISARM_MAX = 2
export const VTX_FREQUENCY_MHZ_MAX = 5999

export class VtxConfigResponse extends Response {
  get deviceType() {
    return this.getUint8(0)
  }

  get deviceTypeName() {
    console.log(VTX_TYPE_NAME)
    return this.supported ? VTX_TYPE_NAME[this.deviceType] : undefined
  }

  get supported() {
    return this.deviceType !== VTX_TYPE.DEV_UNKNOWN
  }

  get band() {
    return this.supported ? this.getUint8(1) : undefined
  }

  get bandName() {
    return this.supported ? VTX_BAND[this.band] : undefined
  }

  get channel() {
    return this.supported ? this.getUint8(2) : undefined
  }

  get power() {
    return this.supported ? this.getUint8(3) : undefined
  }

  get minPower() {
    return this.supported ? 1 : undefined
  }

  get getMaxPower() {
    if (this.supported) {
      if (this.deviceType === VTX_TYPE.DEV_SMARTAUDIO || this.deviceType === VTX_TYPE.DEV_TRAMP) {
        return 5
      } else {
        return 3
      }
    } else {
      return undefined
    }
  }

  get pitMode() {
    return this.supported ? this.getUint8(4) : undefined
  }

  get ready() {
    return this.supported ? this.getUint8(5) : undefined
  }

  get lowPowerDisarm() {
    return this.supported ? this.getUint8(6) : undefined
  }
}
