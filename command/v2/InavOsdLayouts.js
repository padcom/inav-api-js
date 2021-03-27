import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_INAV_OSD_LAYOUTS = 0x2012

export class InavOsdLayoutsRequest extends Request {
  constructor() {
    super(MSP2_INAV_OSD_LAYOUTS)
  }
}

export class InavOsdLayoutItemRequest extends Request {
  #layout = 0
  #item = 0

  constructor(layout, item) {
    super(MSP2_INAV_OSD_LAYOUTS)
    this.#layout = layout
    this.#item = item
  }

  get payload() {
    const result = []
    result.push8(this.#layout)
    result.push16(this.#item)

    return result
  }
}

export class InavOsdLayoutItemsRequest extends Request {
  #layout = 0

  constructor(layout) {
    super(MSP2_INAV_OSD_LAYOUTS)
    this.#layout = layout
  }

  get payload() {
    const result = []
    result.push8(this.#layout)

    return result
  }
}

export class InavOsdLayoutResponse extends Response {
  get layoutCount() {
    return this.getUint8(0)
  }

  get itemCount() {
    return this.getUint8(1)
  }

  get position() {
    return this.getUint16(0, true)
  }

  get count() {
    return this.payload.byteLength / 2
  }

  get items() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(this.getUint16(i * 2, true))
    }
    return result
  }
}
