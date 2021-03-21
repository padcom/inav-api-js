import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_GPS_SV_INFO = 164

export class GpsSvInfoRequest extends Request {
  constructor() {
    super(MSP_GPS_SV_INFO)
  }
}

// TODO: Figure out what this does
// export class GpsSvInfoResponse extends Response {
// }
