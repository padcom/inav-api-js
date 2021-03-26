import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_AIR_SPEED = 0x2009

export class InavAirSpeedRequest extends Request {
  constructor() {
    super(MSP2_INAV_AIR_SPEED)
  }
}

export class InavAirSpeedResponse extends Response {
  get speed() {
    return this.getUint32(0, true)
  }
}
