import { EventEmitter } from 'events'

export const LOG_LEVEL = Object.freeze({
  TRACE: 0,
  DEBUG: 1,
  INFO : 2,
  WARN : 3,
  ERROR: 4
})

export class Logger {
  static #loggers = new Map()
  static #events = new EventEmitter()

  static get events() {
    return Logger.#events
  }

  /** @return {Logger} logger */
  static getLogger(name) {
    name = name.toUpperCase()
    if (!Logger.#loggers.has(name)) {
      Logger.#loggers.set(name, new Logger(name))
    }
    return Logger.#loggers.get(name)
  }

  #name = 'DEFAULT'
  #level = LOG_LEVEL.DEBUG

  constructor(name, level = LOG_LEVEL.INFO) {
    this.#name = name
    this.#level = level
  }

  set level(value) {
    this.#level = value
  }

  trace(...args) {
    if (this.#level <= LOG_LEVEL.TRACE)
      Logger.#events.emit('trace', { source: this.#name, args })
  }

  debug(...args) {
    if (this.#level <= LOG_LEVEL.DEBUG)
      Logger.#events.emit('debug', { source: this.#name, args })
  }

  info(...args) {
    if (this.#level <= LOG_LEVEL.INFO)
      Logger.#events.emit('info', { source: this.#name, args })
  }

  warn(...args) {
    if (this.#level <= LOG_LEVEL.WARN)
      Logger.#events.emit('warn', { source: this.#name, args })
  }

  error(...args) {
    if (this.#level <= LOG_LEVEL.ERROR)
      Logger.#events.emit('error', { source: this.#name, args })
  }
}
