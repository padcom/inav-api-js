import Readline from '@serialport/parser-readline'
import { Timer, sleep, waitForSingleEvent } from "./utils"

export class CLI {
  #port = null

  constructor(port) {
    this.#port = port
  }

  async enter() {
    this.#port.write('#')
    await sleep(1000)
  }

  async exit(timeoutToDisconnect = 10000) {
    await this.#port.write('\nexit\n')
    return waitForSingleEvent(this.#port, 'close', timeoutToDisconnect)
  }

  async command(cmd, timeout = 100) {
    return new Promise(async resolve => {
      const lines = []
      const reader = new Readline()
      this.#port.pipe(reader)

      const timer = new Timer()

      const handler = data => {
        timer.reset()
        lines.push(data)
      }

      const cleanup = () => {
        timer.stop()
        reader.off('data', handler)
        // this.#port.unpipe(reader) // WHY IS THIS MESSING EVERYTHING UP?!
        // reader.end()
        resolve(lines.join('\n'))
      }

      timer.on('done', cleanup)
      reader.on('data', handler)

      // this.#port.flush()
      this.#port.write(`${cmd}\n`)
      timer.start(timeout)
    })
  }
}
