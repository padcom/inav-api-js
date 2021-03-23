import { MotorMixRule } from '../../model/MotorMixRule'
import { Request } from '../../Request'
import { Response } from '../../Response'
import { constrain } from '../../utils'


export const MSP2_COMMON_MOTOR_MIXER = 0x1005

export class CommonMotorMixerRequest extends Request {
  constructor() {
    super(MSP2_COMMON_MOTOR_MIXER)
  }
}

export class CommonMotorMixerResponse extends Response {
  get count() {
    return this.payload.byteLength / 8
  }

  get mixes() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(new MotorMixRule(
        constrain((this.getUint16(i * 8, true) / 1000), 0, 1),
        constrain((this.getUint16(i * 8 + 2, true) / 1000) - 2, -2, 2),
        constrain((this.getUint16(i * 8 + 4, true) / 1000) - 2, -2, 2),
        constrain((this.getUint16(i * 8 + 6, true) / 1000) - 2, -2, 2)
      ))
    }

    return result
  }
}
