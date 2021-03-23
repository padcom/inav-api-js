import { Request } from '../../Request'
import { Response } from '../../Response'
import { getKeyForValue } from '../../utils'

export const MSP_PID = 112

export class PidRequest extends Request {
  constructor() {
    super(MSP_PID)
  }
}

export class PidResponse extends Response {
  get count() {
    return this.payload.byteLength / 3
  }

  get pid() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push([
        this.getUint8(i * 3, true),
        this.getUint8(i * 3 + 1, true),
        this.getUint8(i * 3 + 2, true)
      ])
      result.push(this.getUint16(i * 2, true))
    }
    return result
  }
}
