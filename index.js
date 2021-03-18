#!/usr/bin/env node

import SerialPort from 'serialport'

import { PacketProtocol } from './PacketProtocol.js'
import { PacketProtocolV1 } from './PacketProtocolV1.js'
import { sleep } from './utils.js'


const port = new SerialPort('/dev/ttyACM0', e => { if (e) throw e })
const protocol = new PacketProtocolV1()

import { CommandRegistry } from './CommandRegistry.js'
const registry = new CommandRegistry()
registry.init()

port.on('data', data => {
  console.log('<', data)
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
import { RawImuRequest } from './command/RawImu.js'
const request = new RawImuRequest(protocol).encode()
// const request = new ServoRequest(protocol).encode()
// const request = new MotorRequest(protocol).encode()
// const request = new RcChannelRequest(protocol).encode()
// import { RawGpsRequest } from './command/RawGps.js'
// const request = new RawGpsRequest(protocol).encode()
// import { CompGpsRequest } from './command/CompGps.js'
// const request = new CompGpsRequest(protocol).encode()
// import { GpsStatisticsRequest } from './command/GpsStatistics.js'
// const request = new GpsStatisticsRequest(protocol).encode()
// import { AttitudeRequest } from './command/Attitude.js'
// const request = new AttitudeRequest(protocol).encode()
// import { AltitudeRequest } from './command/Altitude.js'
// const request = new AltitudeRequest(protocol).encode()
// import { SonarRequest } from './command/Sonar.js'
// const request = new SonarRequest(protocol).encode()
// import { AnalogRequest } from './command/Analog.js'
// const request = new AnalogRequest(protocol).encode()
// import { RcTuningRequest } from './command/RcTuning.js'
// const request = new RcTuningRequest(protocol).encode()
// import { PIDRequest } from './command/PID.js'
// const request = new PIDRequest(protocol).encode()
// import { ArmingConfigRequest } from './command/ArmingConfig.js'
// const request = new ArmingConfigRequest(protocol).encode()
// import { LoopTimeRequest } from './command/LoopTime.js'
// const request = new LoopTimeRequest(protocol).encode()
// import { ThreeDeeRequest } from './command/3D.js'
// const request = new ThreeDeeRequest(protocol).encode()
// import { BoxNamesRequest } from './command/BoxNames.js'
// const request = new BoxNamesRequest(protocol).encode()
// import { PidNamesRequest } from './command/PidNames.js'
// const request = new PidNamesRequest(protocol).encode()
// import { WPRequest } from './command/WP.js'
// const request = new WPRequest(protocol).encode()
// import { BoxIDsRequest } from './command/BoxIDs.js'
// const request = new BoxIDsRequest(protocol).encode()
// import { ServoMixRulesRequest } from './command/ServoMixRules.js'
// const request = new ServoMixRulesRequest(protocol).encode()
// import { RxConfigRequest } from './command/RxConfig.js'
// const request = new RxConfigRequest(protocol).encode()

port.write(request, (e) => {
  if (e) {
    console.log('Error writing data:', e)
  } else {
    console.log('>', request)
  }
})
