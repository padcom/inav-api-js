#!/usr/bin/env node

import SerialPort from 'serialport'

import { PacketProtocol } from './PacketProtocol.js'
import { PacketProtocolV1 } from './PacketProtocolV1.js'
import { UnknownResponse } from './command/Unknown.js'
import { VersionRequest } from './command/Version.js'
import { IdentRequest } from './command/Ident.js'
import { StatusRequest } from './command/Status.js'
import { StatusExRequest } from './command/StatusEx.js'
import { ActiveBoxesRequest } from './command/ActiveBoxes.js'
import { SensorStatusRequest } from './command/SensorStatus.js'
import { RawIMURequest } from './command/RawIMU.js'
import { ServoRequest } from './command/Servo.js'
import { MotorRequest } from './command/Motor.js'
import { RcChannelRequest } from './command/RcChannel.js'
import { RawGPSRequest } from './command/RawGPS.js'
import { CompGPSRequest } from './command/CompGPS.js'
import { sleep } from './utils.js'


const port = new SerialPort('/dev/ttyACM0', e => { if (e) throw e })
const protocol = new PacketProtocolV1()

import { CommandRegistry } from './CommandRegistry.js'
const registry = new CommandRegistry()
registry.init()

port.on('data', data => {
  console.log('<', data)
  // const ResponseClass = RESPONSES[PacketProtocol.decodeCommandCode(data)] || UnknownResponse
  const code = PacketProtocol.decodeCommandCode(data)
  const ResponseClass = registry.getCommandByCode(code).response
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
// const request = new ServoRequest(protocol).encode()
// const request = new MotorRequest(protocol).encode()
// const request = new RcChannelRequest(protocol).encode()
// const request = new RawGPSRequest(protocol).encode()
// const request = new CompGPSRequest(protocol).encode()
// import { GPSStatisticsRequest } from './command/GPSStatistics.js'
// const request = new GPSStatisticsRequest(protocol).encode()
import { AttitudeRequest } from './command/Attitude.js'
const request = new AttitudeRequest(protocol).encode()

port.write(request, (e) => {
  if (e) {
    console.log('Error writing data:', e)
  } else {
    console.log('>', request)
  }
})
