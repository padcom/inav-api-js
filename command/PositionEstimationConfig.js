import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_POSITION_ESTIMATION_CONFIG = 16

export class PositionEstimationConfigRequest extends Request {
  constructor() {
    super(MSP_POSITION_ESTIMATION_CONFIG)
  }
}

export class PositionEstimationConfigResponse extends Response {
  get wzBaroP() {
    return this.getUint16(0, true) / 100
  }

  get wzGpsP() {
    return this.getUint16(2, true) / 100
  }

  get wzGpsV() {
    return this.getUint16(4, true) / 100
  }

  get wxyGpsP() {
    return this.getUint16(6, true) / 100
  }

  get wxyGpsV() {
    return this.getUint16(8, true) / 100
  }

  get gpsMinSats() {
    return this.getUint8(10)
  }

  get useGpsVelned() {
    return this.getUint8(11)
  }
}
