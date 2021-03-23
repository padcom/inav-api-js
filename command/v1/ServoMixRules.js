import { Request } from '../../Request'
import { Response } from '../../Response'
import { ServoMixRule } from '../../model/ServoMixRule'

export const MSP_SERVO_MIX_RULES = 241

export class ServoMixRulesRequest extends Request {
  constructor() {
    super(MSP_SERVO_MIX_RULES)
  }
}

export class ServoMixRulesResponse extends Response {
  get count() {
    return this.payload.byteLength / 8
  }

  get servoMixRule() {
    const result = []
    for (let i = 0; i < this.count; i++) {
      result.push(new ServoMixRule(
        this.getInt8(i * 8),
        this.getInt8(i * 8 + 1),
        this.getInt16(i * 8 + 2, true),
        this.getInt8(i * 8 + 4),
        this.getInt8(i * 8 + 5)
      ))
    }
    return result
  }

  getToStringContent() {
    return `{\n  count = ${this.count}\n  servoMixRule = [\n    ${this.servoMixRule.join(',\n    ')}\n  ]\n}`
  }
}
