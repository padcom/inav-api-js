import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP2_SETTING = 0x1003

Array.prototype.push8 = function(val) {
  this.push(0xFF & val)
  return this;
}

Array.prototype.push16 = function(val) {
  this.push8(val)
  this.push8(val >> 8)
  return this;
}

Array.prototype.push32 = function(val) {
  this.push8(val)
  this.push8(val >> 8)
  this.push8(val >> 16)
  this.push8(val >> 24)
  return this;
}

Array.prototype.pushString = function(val) {
  for (let i = 0; i < val.length; i++) {
    this.push8(val.charCodeAt(i))
  }
  this.push8(0)
  return this;
}

Array.prototype.toBuffer = function() {
  return Buffer.from(this)
}

Array.prototype.toArrayBuffer = function() {
  const result = new ArrayBuffer(this.length)
  const view = new Uint8Array(result)
  for (let i = 0; i < this.length; i++) {
    view[i] = this[i]
  }
  return result
}

Array.prototype.toDataView = function(offset, length) {
  return new DataView(this.toArrayBuffer(), offset, length)
}

export const SETTING_TYPE = {
  0: { type: 'uint8', size: 1 },
  1: { type: 'int8', size: 1 },
  2: { type: 'uint16', size: 2 },
  3: { type: 'int16', size: 2 },
  4: { type: 'uint32', size: 4 },
  5: { type: 'float', size: 4 },
  6: { type: 'string', size: undefined }
}

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
