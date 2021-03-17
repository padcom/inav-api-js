#!/usr/bin/env node

import SerialPort from 'serialport'

import { PacketProtocol } from './PacketProtocol.js'
import { PacketProtocolV1 } from './PacketProtocolV1.js'
import { UnknownResponse } from './UnknownResponse.js'
import { IdentRequest } from './IdentRequest.js'
import { IdentResponse } from './IdentResponse.js'
import { StatusRequest } from './StatusRequest.js'
import { StatusResponse } from './StatusResponse.js'
import { StatusExRequest } from './StatusExRequest.js'
import { StatusExResponse } from './StatusExResponse.js'
import { ActiveBoxesRequest } from './ActiveBoxesRequest.js'
import { SensorStatusRequest } from './SensorStatusRequest.js'
import { SensorStatusResponse } from './SensorStatusResponse.js'
import { RawIMURequest } from './RawIMURequest.js'
import { RawIMUResponse } from './RawIMUResponse.js'


const port = new SerialPort('/dev/ttyACM0', e => { if (e) throw e })

const RESPONSES = {
  100: IdentResponse,
  101: StatusResponse,
  102: RawIMUResponse,
  150: StatusExResponse,
  151: SensorStatusResponse,
}

port.on('data', data => {
  console.log('<', data)
  const ResponseClass = RESPONSES[PacketProtocol.decodeCommandCode(data)] || UnknownResponse
  const response = new ResponseClass(protocol, data)
  console.log(response.toString())
  port.close()
})

const protocol = new PacketProtocolV1()

// const request = new VersionRequest(protocol).encode()
// const request = new IdentRequest(protocol).encode()
// const request = new StatusExRequest(protocol).encode()
// const request = new ActiveBoxesRequest(protocol).encode()
// const request = new SensorStatusRequest(protocol).encode()
const request = new RawIMURequest(protocol).encode()
port.write(request, (e) => {
  if (e) {
    console.log('Error writing data:', e)
  } else {
    console.log('>', request)
  }
})
