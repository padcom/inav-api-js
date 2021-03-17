import { Response } from './Response.js'

export class StatusExResponse extends Response {
  get cycleTime() {
    return this.payload.getUint16(0, true)
  }

  get i2cError() {
    return this.payload.getUint16(2, true)
  }

  get activeSensors() {
    return this.payload.getUint16(4, true)
  }

  get profile() {
    return this.payload.getUint8(10)
  }

  get cpuload() {
    return this.payload.getUint16(11, true)
  }

  get armingFlags() {
    return this.payload.getUint16(13, true)
  }
}
