import { Request } from '../Request.js'
import { Response } from '../Response.js'

export class StatusExRequest extends Request {
  constructor(protocol) {
    super(protocol, 150)
  }
}

export class StatusExResponse extends Response {
  get cycleTime() {
    return this.getUint16(0, true)
  }

  get i2cError() {
    return this.getUint16(2, true)
  }

  get activeSensors() {
    return this.getUint16(4, true)
  }

  get profile() {
    return this.getUint8(10)
  }

  get cpuload() {
    return this.getUint16(11, true)
  }

  get armingFlags() {
    return this.getUint16(13, true)
  }
}
