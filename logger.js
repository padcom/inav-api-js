import { EventEmitter } from 'events'

export class Logger {
  static Level = Object.freeze({
    TRACE: 0,
    DEBUG: 1,
    INFO : 2,
    WARN : 3,
    ERROR: 4
  })

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
  #level = Logger.Level.DEBUG

  constructor(name, level = Logger.Level.INFO) {
    this.#name = name
    this.#level = level
  }

  set level(value) {
    this.#level = value
  }

  trace(...args) {
    if (this.#level <= Logger.Level.TRACE)
      Logger.#events.emit('trace', { source: this.#name, args })
  }

  debug(...args) {
    if (this.#level <= Logger.Level.DEBUG)
      Logger.#events.emit('debug', { source: this.#name, args })
  }

  info(...args) {
    if (this.#level <= Logger.Level.INFO)
      Logger.#events.emit('info', { source: this.#name, args })
  }

  warn(...args) {
    if (this.#level <= Logger.Level.WARN)
      Logger.#events.emit('warn', { source: this.#name, args })
  }

  error(...args) {
    if (this.#level <= Logger.Level.ERROR)
      Logger.#events.emit('error', { source: this.#name, args })
  }
}
