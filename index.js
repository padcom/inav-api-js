#!/usr/bin/env -S node -r esm

import SerialPort from 'serialport'

import { MSP } from './MSP'
import { MSPv1 } from './MSPv1'
import { sleep } from './utils'
import { CommandRegistry } from './CommandRegistry'

const port = new SerialPort('/dev/ttyACM0', e => { if (e) throw e })
const protocol = new MSPv1()
const registry = new CommandRegistry()
registry.init()

port.on('data', data => {
  console.log('<', data)
  const code = MSP.decodeCommandCode(data)
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
// import { RawImuRequest } from './command/RawImu'
// const request = new RawImuRequest(protocol).encode()
// const request = new ServoRequest(protocol).encode()
// const request = new MotorRequest(protocol).encode()
// const request = new RcChannelRequest(protocol).encode()
// import { RawGpsRequest } from './command/RawGps'
// const request = new RawGpsRequest(protocol).encode()
// import { CompGpsRequest } from './command/CompGps'
// const request = new CompGpsRequest(protocol).encode()
// import { GpsStatisticsRequest } from './command/GpsStatistics'
// const request = new GpsStatisticsRequest(protocol).encode()
// import { AttitudeRequest } from './command/Attitude'
// const request = new AttitudeRequest(protocol).encode()
// import { AltitudeRequest } from './command/Altitude'
// const request = new AltitudeRequest(protocol).encode()
// import { SonarRequest } from './command/Sonar'
// const request = new SonarRequest(protocol).encode()
// import { AnalogRequest } from './command/Analog'
// const request = new AnalogRequest(protocol).encode()
// import { RcTuningRequest } from './command/RcTuning'
// const request = new RcTuningRequest(protocol).encode()
// import { PIDRequest } from './command/PID'
// const request = new PIDRequest(protocol).encode()
// import { ArmingConfigRequest } from './command/ArmingConfig'
// const request = new ArmingConfigRequest(protocol).encode()
// import { LoopTimeRequest } from './command/LoopTime'
// const request = new LoopTimeRequest(protocol).encode()
// import { ThreeDeeRequest } from './command/3D'
// const request = new ThreeDeeRequest(protocol).encode()
// import { BoxNamesRequest } from './command/BoxNames'
// const request = new BoxNamesRequest(protocol).encode()
// import { PidNamesRequest } from './command/PidNames'
// const request = new PidNamesRequest(protocol).encode()
// import { WPRequest } from './command/WP'
// const request = new WPRequest(protocol).encode()
// import { BoxIDsRequest } from './command/BoxIDs'
// const request = new BoxIDsRequest(protocol).encode()
import { ServoMixRulesRequest } from './command/ServoMixRules'
const request = new ServoMixRulesRequest(protocol).encode()
// import { RxConfigRequest } from './command/RxConfig'
// const request = new RxConfigRequest(protocol).encode()

port.write(request, (e) => {
  if (e) {
    console.log('Error writing data:', e)
  } else {
    console.log('>', request)
  }
})
