import { Request } from '../../Request'
import { Response } from '../../Response'

export const MSP_MISC = 114

export class MiscRequest extends Request {
  constructor() {
    super(MSP_MISC)
  }
}

export class MiscResponse extends Response {
  get midRc() {
    return this.getInt16(0, true)
  }

  get minThrottle() {
    return this.getUint16(2, true) // 0-2000
  }

  get maxThrottle() {
    return this.getUint16(4, true) // 0-2000
  }

  get minCommand() {
    return this.getUint16(6, true) // 0-2000
  }

  get failsafeThrottle() {
    return this.getUint16(8, true) // 1000-2000
  }

  get gpsType() {
    return this.getUint8(10)
  }

  get sensorsBaudrate() {
    return this.getUint8(11)
  }

  get gpsUbxSbas() {
    return this.getInt8(12)
  }

  get multiwiiCurrentOutput() {
    return this.getUint8(13)
  }

  get rssiChannel() {
    return this.getUint8(14)
  }

  get placeholder2() {
    return this.getUint8(15)
  }

  get magDeclination() {
    return this.getInt16(16, 1) / 10 // -18000-18000
  }

  get vbatScale() {
    return this.getUint8(18) // 10-200
  }

  get vbatMinCellVoltage() {
    return this.getUint8(19) / 10 // 10-50
  }

  get vbatMaxCellVoltage() {
    return this.getUint8(20) / 10 // 10-50
  }

  get vbatWarningCellVoltage() {
    return this.getUint8(21) / 10 // 10-50
  }
}
