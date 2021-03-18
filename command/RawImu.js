import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_RAW_IMU = 102

export class RawImuRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_RAW_IMU)
  }
}

export class RawImuResponse extends Response {
  get accelerometer() {
    return [
      this.getInt16(0, true) / 512,
      this.getInt16(2, true) / 512,
      this.getInt16(4, true) / 512,
    ]
  }

  get gyroscope() {
    return [
      this.getInt16(6, true) * (4 / 16.4),
      this.getInt16(8, true) * (4 / 16.4),
      this.getInt16(10, true) * (4 / 16.4),
    ]
  }

  get magnetometer() {
    return [
      this.getInt16(12, true) / 1090,
      this.getInt16(14, true) / 1090,
      this.getInt16(16, true) / 1090,
    ]
  }
}
