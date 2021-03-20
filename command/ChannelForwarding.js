import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_CHANNEL_FORWARDING = 32

export class ChannelForwardingRequest extends Request {
  constructor() {
    super(MSP_CHANNEL_FORWARDING)
  }
}

export class ChannelForwardingResponse extends Response {
  get forwardTo() {
    const result = []
    for (let i = 0; i < this.payload.byteLength; i++) {
      result.push(this.getUint8(i))
    }
    return result
  }
}
