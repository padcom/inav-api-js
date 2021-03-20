import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_CALIBRATION_DATA = 14

export class CalibrationDataRequest extends Request {
  constructor() {
    super(MSP_CALIBRATION_DATA)
  }
}

export class CalibrationDataResponse extends Response {
  get #calibrations() {
    return this.getUint8(0)
  }

  get accPos() {
    const calibrations = this.getUint8(0)
    return [
      1 & (this.#calibrations >> 0),
      1 & (this.#calibrations >> 1),
      1 & (this.#calibrations >> 2),
      1 & (this.#calibrations >> 3),
      1 & (this.#calibrations >> 4),
      1 & (this.#calibrations >> 5)
    ]
  }

  get accZero() {
    return {
      x: this.getInt16(1, true),
      y: this.getInt16(3, true),
      z: this.getInt16(5, true)
    }
  }

  get accGain() {
    return {
      x: this.getInt16(7, true),
      y: this.getInt16(9, true),
      z: this.getInt16(11, true)
    }
  }

  get magZero() {
    return {
      x: this.getInt16(13, true),
      y: this.getInt16(15, true),
      z: this.getInt16(17, true)
    }
  }

  get magGain() {
    return {
      x: this.getInt16(21, true),
      y: this.getInt16(23, true),
      z: this.getInt16(25, true)
    }
  }

  get optflowScale() {
    return this.getInt16(19, true) / 256.0
  }

  // toString() {
  //   return JSON.stringify(this.accGain)
  // }
}
