import { EventEmitter } from 'events'

export function getObjectPropertyNames(obj) {
  return Object
    .getOwnPropertyNames(Object.getPrototypeOf(obj))
    .filter(prop => typeof obj[prop] !== 'function')
}

export function getKeyForValue(obj, value) {
  return Object.entries(obj).find(([k, v]) => v === value)
}

export function getByteAtOffset(buffer, offset) {
  if (buffer instanceof Buffer) return buffer[offset]
  else if (buffer instanceof DataView) return buffer.getUint8(offset)
  else throw new Error('Don\'t know how to get data from', buffer.constructor)
}

export function readonly(object, field, value) {
  Object.defineProperty(object, field, {
    get() { return value }
  })
}

export function hex(n, width = 2) {
  return `0x${('0'.repeat(width) + n.toString(16)).substr(-width)}`
}

export function sleep(ms) {
  return new Promise(resolve => { setTimeout(resolve, ms) })
}

export function bitCheck(num, bit) {
  return (num >> bit) % 2 != 0
}

export function switchKeyValues(obj) {
  return Object
    .keys(obj)
    .reduce((acc, field, index) => ({ ...acc, [obj[field]]: field }), {})
}

export function runWithTimeout(interval, timeout, cb, finish = () => {}) {
  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('Timeout'))
    }, timeout)

    const body = async () => {
      const result = await cb()
      if (result) {
        cleanup()
        resolve(result)
      }
    }

    const worker = timeout === interval ? 0 : setInterval(body, interval)
    await body()

    function cleanup() {
      finish()
      clearTimeout(timer)
      clearInterval(worker)
    }
  })
}

export async function waitForSingleEvent(emitter, event, timeout = 1000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error(`Timeout waiting for event ${event}`))
    }, timeout)

    const handler = (...args) => {
      cleanup()
      if (args.length === 0) resolve(true)
      else if (args.length === 1) resolve(args[0])
      else resolve(args)
    }

    try {
      emitter.once(event, handler)
    } catch (e) {
      console.log('Error', e)
    }

    const cleanup = () => {
      emitter.off(event, handler)
      clearTimeout(timer)
    }
  })
}

export class Timer extends EventEmitter {
  #timer = null
  #timeout = null

  start(ms) {
    this.#timeout = ms
    this.#timer = setTimeout(this.#handler, this.#timeout)
  }

  stop() {
    if (this.#timer) {
      clearTimeout(this.#timer)
      this.#timer = null
      this.#timeout = null
    }
  }

  reset() {
    if (this.#timer) {
      clearTimeout(this.#timer)
      this.#timer = setTimeout(this.#handler, this.#timeout)
    }
  }

  #handler = () => {
    clearTimeout(this.#timer)
    this.#timer = null
    this.#timeout = null
    this.emit('done')
  }
}
