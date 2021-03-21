import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_VTX_CONFIG = 88

export class VtxConfigRequest extends Request {
  constructor() {
    super(MSP_VTX_CONFIG)
  }
}

export const VTX_TYPE = {
  UNKNOWN: 0xFF
}

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

  get pitmode() {
    return this.supported ? this.getUint8(4) : undefined
  }

  get ready() {
    return this.supported ? this.getUint8(5) : undefined
  }

  get low_power_disarm() {
    return this.supported ? this.getUint8(6) : undefined
  }
}
