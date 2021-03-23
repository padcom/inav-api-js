import { MotorMixRule } from '../../model/MotorMixRule'
import { Request } from '../../Request'
import { Response } from '../../Response'
import { constrain } from '../../utils'

export const MSP2_COMMON_SERIAL_CONFIG = 0x1009

export class CommonSerialConfigRequest extends Request {
  constructor() {
    super(MSP2_COMMON_SERIAL_CONFIG)
  }
}

const BAUDRATE = [
  'AUTO',
  '1200',
  '2400',
  '4800',
  '9600',
  '19200',
  '38400',
  '57600',
  '115200',
  '230400',
  '250000',
  '460800',
  '921600'
]

export class CommonSerialConfigResponse extends Response {
  get count() {
    return this.payload.byteLength / 9
  }

  get ports() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push({
        identifier: this.getUint8(i * 9),
        funcitonMask: this.getUint8(i * 9 + 1, true),
        mspBaudrate: BAUDRATE[this.getUint8(i * 9 + 5)],
        gpsBaudrate: BAUDRATE[this.getUint8(i * 9 + 6)],
        telemetryBaudrate: BAUDRATE[this.getUint8(i * 9 + 7)],
        peripherialBaudrate: BAUDRATE[this.getUint8(i * 9 + 8)]
      })
    }

    return result
  }
}
