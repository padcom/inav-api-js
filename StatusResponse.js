import { Response } from './Response.js'

export class StatusResponse extends Response {
  get cycleTime() {
    return data.getUint16(0, true)
  }

  get i2cError() {
    return data.getUint16(2, true)
  }

  get activeSensors() {
    return data.getUint16(4, true)
  }

  get mode() {
    return data.getUint32(6, true)
  }

  get profile() {
    return data.getUint8(10) // PADCOM: this produces out of bounds error with iNAV 2.6.1
  }
}
