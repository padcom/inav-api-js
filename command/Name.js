import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_NAME = 10

export class NameRequest extends Request {
  constructor() {
    super(MSP_NAME)
  }
}

export class NameResponse extends Response {
  get name() {
    return this.getString(0)
  }
}
