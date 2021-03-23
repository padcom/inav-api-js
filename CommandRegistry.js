import fs from 'fs'
import { Logger } from './logger'
import { hex } from './utils'
import { UnknownResponse } from './command/Unknown'

export class CommandRegistry {
  #log = Logger.getLogger('REGISTRY')
  #commands = new Map()

  async init() {
    const v1CommandFiles = fs.readdirSync('./command/v1')
    const v2CommandFiles = fs.readdirSync('./command/v2')

    return Promise.all(
      [...v1CommandFiles].map(commandFile => this.#registerV1CommandFile(commandFile)),
      [...v2CommandFiles].map(commandFile => this.#registerV2CommandFile(commandFile))
    )
  }

  async #registerV1CommandFile(commandFile) {
    this.#log.debug('[REGISTRY] Registering v1 command', commandFile)
    const commandModule = await import(`./command/v1/${commandFile}`)
    const command = Object.keys(commandModule).find(key => key.startsWith('MSP_'))
    if (!command) {
      this.#log.warn(`[REGISTRY] Skipping registration of ${commandFile}: command not found`)
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
    this.#log.debug('[REGISTRY] Registering v2 command', commandFile)
    const commandModule = await import(`./command/v2/${commandFile}`)
    const command = Object.keys(commandModule).find(key => key.startsWith('MSP2_') || key.startsWith('MSPV2_'))
    if (!command) {
      this.#log.warn(`[REGISTRY] Skipping registration of ${commandFile}: command not found`)
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
      this.#log.error(`Command ${command} with code ${hex(code)} already registered!`)
      throw new Error(`Command ${command} with code ${hex(code)} already registered!`)
    }

    this.#commands.set(code, { command, request, response })
  }

  getCommandByCode(code) {
    this.#log.trace(`Retrieving command with code ${hex(code)}/${code}`)
    if (this.#commands.has(code)) {
      const command = this.#commands.get(code)
      this.#log.debug(`Command with code ${hex(code)}/${code} found ${command}`)
      return command
    } else {
      this.#log.warn(`Command with code ${hex(code)}/${code} not found`)
      return {
        command: 'unknown',
        code,
        request: null,
        response: UnknownResponse
      }
    }
  }
}
