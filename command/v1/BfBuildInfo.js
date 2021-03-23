import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_BF_BUILD_INFO = 69

export class BfBuildInfoRequest extends Request {
  constructor() {
    super(MSP_BF_BUILD_INFO)
  }
}

// TODO: figure out what it does
// export class BfBuildInfoResponse extends Response {
// }
