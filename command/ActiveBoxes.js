import { Request } from '../Request'

export const MSP_ACTIVEBOXES = 113

export class ActiveBoxesRequest extends Request {
  constructor() {
    super(MSP_ACTIVEBOXES)
  }
}
