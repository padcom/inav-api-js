import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_SETTING = 0x1003

export class SettingRequest extends Request {
  #index = null

  constructor(index) {
    super(MSP2_SETTING)
    this.#index = index
  }

  get payload() {
    const result = []
    result.push8(0)
    result.push16(this.#index)

    return result
  }
}

export class SettingResponse extends Response {
  get value() {
    // TODO: figure out how to read strings

    if (this.payload.byteLength === 1) {
      return this.getUint8(0)
    } else if (this.payload.byteLength === 2) {
      return this.getUint16(0)
    } else if (this.payload.byteLength === 4) {
      return this.getUint32(0)
    } else {
      throw new Error('Unknown value length')
    }
  }
}
