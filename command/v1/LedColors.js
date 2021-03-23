import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_LED_COLORS = 46

export class LedColorsRequest extends Request {
  constructor() {
    super(MSP_LED_COLORS)
  }
}

export class LedColorsResponse extends Response {
  get count() {
    return this.payload.byteLength / 4
  }

  get ranges() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      const h = this.getUint16(i * 4, true)
      const s = this.getUint8(i * 4 + 2)
      const v = this.getUint8(i * 4 + 3)
      result.push({ h, s, v })
    }
    return result
  }
}
