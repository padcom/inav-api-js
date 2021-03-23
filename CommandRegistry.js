import fs from 'fs'
import { hex } from './utils'
import { UnknownResponse } from './command/Unknown'

export class CommandRegistry {
  #debug = false
  #commands = new Map()

  constructor({ debug = false } = {}) {
    this.#debug = debug
  }

  async init() {
    const v1CommandFiles = fs.readdirSync('./command/v1')
    const v2CommandFiles = fs.readdirSync('./command/v2')

    return Promise.all(
      [...v1CommandFiles].map(commandFile => this.#registerV1CommandFile(commandFile)),
      [...v2CommandFiles].map(commandFile => this.#registerV2CommandFile(commandFile))
    )
  }

  async #registerV1CommandFile(commandFile) {
    if (this.#debug) console.log('[REGISTRY] Registering v1 command', commandFile)
    const commandModule = await import(`./command/v1/${commandFile}`)
    const command = Object.keys(commandModule).find(key => key.startsWith('MSP_'))
    if (!command) {
      if (this.#debug) console.log(`[REGISTRY] Skipping registration of ${commandFile}: command not found`)
      return
    }
    const reqClassName = Object.keys(commandModule).find(key => key.endsWith('Request'))
    const resClassName = Object.keys(commandModule).find(key => key.endsWith('Response'))
    this.register(
      command,
      commandModule[command],
      commandModule[reqClassName],
      commandModule[resClassName] || UnknownResponse
    )
  }

  async #registerV2CommandFile(commandFile) {
    if (this.#debug) console.log('[REGISTRY] Registering v2 command', commandFile)
    const commandModule = await import(`./command/v2/${commandFile}`)
    const command = Object.keys(commandModule).find(key => key.startsWith('MSP2_') || key.startsWith('MSPV2_'))
    if (!command) {
      if (this.#debug) console.log(`[REGISTRY] Skipping registration of ${commandFile}: command not found`)
      return
    }
    const reqClassName = Object.keys(commandModule).find(key => key.endsWith('Request'))
    const resClassName = Object.keys(commandModule).find(key => key.endsWith('Response'))
    this.register(
      command,
      commandModule[command],
      commandModule[reqClassName],
      commandModule[resClassName] || UnknownResponse
    )
  }

  register(command, code, request, response) {
    if (this.#commands.has(code)) {
      throw new Error(`Command ${command} with code ${hex(code)} already registered!`)
    }

    this.#commands.set(code, { command, request, response })
  }

  getCommandByCode(code) {
    if (this.#commands.has(code)) {
      return this.#commands.get(code)
    } else {
      return {
        command: 'unknown',
        code,
        request: null,
        response: UnknownResponse
      }
    }
  }
}
