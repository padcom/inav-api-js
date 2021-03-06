import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_RAW_GPS = 106

export class RawGpsRequest extends Request {
  constructor() {
    super(MSP_RAW_GPS)
  }
}

export class RawGpsResponse extends Response {
  get fix() {
    return this.getUint8(0)
  }
  
  get numSat() {
    return this.getUint8(1)
  }
  
  get lat() {
    return this.getInt32(2, true)
  }
  
  get lon() {
    return this.getInt32(6, true)
  }
  
  get alt() {
    return this.getInt16(10, true)
  }
  
  get speed() {
    return this.getUint16(12, true)
  }
  
  get groundCourse() {
    return this.getUint16(14, true)
  }
  
  get hdop() {
    return this.getUint16(16, true)
  }
}
