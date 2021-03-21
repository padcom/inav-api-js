import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_SENSOR_ALIGNMENT = 126

export class SensorAlignmentRequest extends Request {
  constructor() {
    super(MSP_SENSOR_ALIGNMENT)
  }
}

export class SensorAlignmentResponse extends Response {
  get gyro() {
    return this.getUint8(0)
  }

  get acc() {
    return this.getUint8(1)
  }

  get mag() {
    return this.getUint8(2)
  }

  get opflow() {
    return this.getUint8(3)
  }
}
