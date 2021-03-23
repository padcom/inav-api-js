import { constrain } from "../utils"

export class MotorMixRule {
  constructor(throttle, roll, pitch, yaw) {
    this.throttle = throttle
    this.roll = roll
    this.pitch = pitch
    this.yaw = yaw
  }

  get isUsed() {
    return this.throttle !== 0
  }
}
