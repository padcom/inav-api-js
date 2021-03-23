import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_COMMON_PG_LIST = 0x1008

export class CommonPgListRequest extends Request {
  constructor() {
    super(MSP2_COMMON_PG_LIST)
  }
}

export class CommonPgListResponse extends Response {
  get count() {
    return this.payload.byteLength / 6
  }

  get value() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push({
        id: this.getUint16(i * 6, true),
        start: this.getUint16(i * 6 + 2, true),
        end: this.getUint16(i * 6 + 4, true)
      })
    }
    return result
  }
}
