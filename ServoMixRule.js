export class ServoMixRule {
  constructor(target, input, rate, speed, condition) {
    this.target = target
    this.input = input
    this.rate = rate
    this.speed = speed
    this.condition = condition
  }

  toString() {
    return `ServoMixRule(target: ${this.target}, input: ${this.input}, rate: ${this.rate}, speed: ${this.speed}, condition: ${this.condition})`
  }
}
