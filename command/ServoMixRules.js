import { Request } from '../Request.js'
import { Response } from '../Response.js'
import { ServoMixRule } from '../ServoMixRule.js'

export const MSP_SERVO_MIX_RULES = 241

export class ServoMixRulesRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_SERVO_MIX_RULES)
  }
}

export class ServoMixRulesResponse extends Response {
  get count() {
    return this.payloadLength / 8
  }

  get motor() {
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
}
