#!/usr/bin/env node

import SerialPort from 'serialport'

import { PacketProtocol } from './PacketProtocol.js'
import { PacketProtocolV1 } from './PacketProtocolV1.js'
import { UnknownResponse } from './command/Unknown.js'
import { VersionRequest, VersionResponse } from './command/Version.js'
import { IdentRequest, IdentResponse } from './command/Ident.js'
import { StatusRequest, StatusResponse } from './command/Status.js'
import { StatusExRequest, StatusExResponse } from './command/StatusEx.js'
import { ActiveBoxesRequest } from './command/ActiveBoxes.js'
import { SensorStatusRequest, SensorStatusResponse } from './command/SensorStatus.js'
import { RawIMURequest, RawIMUResponse } from './command/RawIMU.js'
import { ServoRequest, ServoResponse } from './command/Servo.js'
import { sleep } from './utils.js'


const port = new SerialPort('/dev/ttyACM0', e => { if (e) throw e })
const protocol = new PacketProtocolV1()

const RESPONSES = {
    1: VersionResponse,
  100: IdentResponse,
  101: StatusResponse,
  102: RawIMUResponse,
  103: ServoResponse,
  150: StatusExResponse,
  151: SensorStatusResponse,
}

port.on('data', data => {
  console.log('<', data)
  const ResponseClass = RESPONSES[PacketProtocol.decodeCommandCode(data)] || UnknownResponse
  const response = new ResponseClass(protocol, data)
  console.log(response.toString())
  sleep(100).then(() => { port.close() })
})

// const request = new VersionRequest(protocol).encode()
// const request = new IdentRequest(protocol).encode()
// const request = new StatusExRequest(protocol).encode()
// const request = new ActiveBoxesRequest(protocol).encode()
// const request = new SensorStatusRequest(protocol).encode()
// const request = new RawIMURequest(protocol).encode()
const request = new ServoRequest(protocol).encode()
port.write(request, (e) => {
  if (e) {
    console.log('Error writing data:', e)
  } else {
    console.log('>', request)
  }
})
