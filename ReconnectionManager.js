import EventEmitter from 'events'
import SerialPort from 'serialport'
import { runWithTimeout, sleep, Timer, waitForSingleEvent } from "./utils"

export class ReconnectionManager extends EventEmitter {
  #port = null
  #closed = false

  constructor(port) {
    super()
    this.#port = port
    this.reconnect = true

    this.#port.on('close', this.#portClosedHandler)
  }

  close () {
    this.#closed = true
    this.#port.off('close', this.#portClosedHandler)
  }

  async connect(timeout = 10000) {
    if (this.#port.isOpen) {
      this.#sendIdentRequest()
      return this.#waitForIdentResponse()
    } else {
      return waitForSingleEvent(this, 'reconnected', timeout)
    }
  }

  #portClosedHandler = () => {
    this.emit('disconnected')
    if (this.reconnect) this.#reconnect()
  }

  async #reconnect() {
    await this.#waitForPortToExist()
    this.emit('available', this.#port)
    await this.#waitForPortToOpen()
    let index = 0
    while (!this.closed) {
      this.emit('reconnecting', index++)
      try {
        this.#sendIdentRequest()
        await this.#waitForIdentResponse()
        break
      } catch (e) {
      }
    }
    this.emit('reconnected')
  }

  async #waitForPortToExist() {
    return runWithTimeout(500, 15000, async () => {
      const ports = await SerialPort.list()
      return ports.some(item => item.path === this.#port.path)
    })
  }

  async #waitForPortToOpen() {
    this.#port.open()
    return waitForSingleEvent(this.#port, 'open', 30000) 
  }

  #sendIdentRequest() {
    const cmd = Buffer.from([ '$'.charCodeAt(0), 'M'.charCodeAt(0), '<'.charCodeAt(0), 0, 1, 1 ])
    return this.#port.write(cmd)
  }

  async #waitForIdentResponse() {
    return waitForSingleEvent(this.#port, 'data', 1000)
  }
}
