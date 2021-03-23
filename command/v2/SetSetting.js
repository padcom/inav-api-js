import { Request } from '../../Request'
import { Response } from '../../Response'

import * as DataType from '../../model/DataType'

export const MSP2_SET_SETTING = 0x1004

export class SetSettingRequest extends Request {
  #index = null
  #type = null
  #value = null

  constructor(index, type, value) {
    super(MSP2_SET_SETTING)
    this.#index = index
    this.#type = type
    this.#value = value
  }

  get payload() {
    const result = []
    result.push8(0)
    result.push16(this.#index)
    switch (this.#type) {
      case DataType.TYPE_UINT8:
        result.push8(this.#value)
        break
      case DataType.TYPE_INT8:
        result.push8(this.#value)
        break
      case DataType.TYPE_UINT16:
        result.push16(this.#value)
        break
      case DataType.TYPE_INT16:
        result.push16(this.#value)
        break
      case DataType.TYPE_UINT32:
        result.push32(this.#value)
        break
      case DataType.TYPE_FLOAT:
        result.push32(this.#value)
        break
      case DataType.TYPE_STRING:
        result.pushString(this.#value)
        break
      default:
        throw new Error(`Unknown data type ${this.#type}`)
    }

    return result
  }
}

export class SetSettingResponse extends Response {
  get value() {
    return this.payload
  }
}
