import fs from 'fs'
import { UnknownResponse } from './command/Unknown.js'

export class CommandRegistry {
  #commands = new Map()

  async init() {
    const commandFiles = fs.readdirSync('./command')

    return Promise.all(
      commandFiles.map(async (commandFile) => {
        await this.#registerCommandFile(commandFile)
      })
    )
  }

  async #registerCommandFile(commandFile) {
    const commandModule = await import(`./command/${commandFile}`)
    const command = Object.keys(commandModule).find(key => key.startsWith('MSP_') || key.startsWith('INAV_'))
    if (!command) return
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
