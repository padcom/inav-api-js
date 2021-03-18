import { Request } from '../Request.js'

export const MSP_ACTIVEBOXES = 113

export class ActiveBoxesRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_ACTIVEBOXES)
  }
}
