#!/usr/bin/env -S node -r esm

import SerialPort from 'serialport'
import { msp, MSPv1 } from './msp'

const port = new SerialPort('/dev/ttyACM0', { autoOpen: true })
const protocol = new MSPv1()

import { VersionRequest } from './command/Version'
import { IdentRequest } from './command/Ident'
import { StatusExRequest } from './command/StatusEx'
import { ActiveBoxesRequest } from './command/ActiveBoxes'
import { SensorStatusRequest } from './command/SensorStatus'
import { RawImuRequest } from './command/RawImu'
import { ServoRequest } from './command/Servo'
import { MotorRequest } from './command/Motor'
import { RcChannelRequest } from './command/RcChannel'
import { RawGpsRequest } from './command/RawGps'
import { CompGpsRequest } from './command/CompGps'
import { GpsStatisticsRequest } from './command/GpsStatistics'
import { AttitudeRequest } from './command/Attitude'
import { AltitudeRequest } from './command/Altitude'
import { SonarRequest } from './command/Sonar'
import { AnalogRequest } from './command/Analog'
import { RcTuningRequest } from './command/RcTuning'
import { PIDRequest } from './command/PID'
import { ArmingConfigRequest } from './command/ArmingConfig'
import { LoopTimeRequest } from './command/LoopTime'
import { ThreeDeeRequest } from './command/3D'
import { BoxNamesRequest } from './command/BoxNames'
import { PidNamesRequest } from './command/PidNames'
import { WPRequest } from './command/WP'
import { BoxIDsRequest } from './command/BoxIDs'
import { ServoMixRulesRequest } from './command/ServoMixRules'
import { RxConfigRequest } from './command/RxConfig'

async function test() {
  console.log((await msp(port, new VersionRequest(), protocol)).toString())
  console.log((await msp(port, new IdentRequest(), protocol)).toString())
  console.log((await msp(port, new StatusExRequest(), protocol)).toString())
  console.log((await msp(port, new ActiveBoxesRequest(), protocol)).toString())
  console.log((await msp(port, new SensorStatusRequest(), protocol)).toString())
  console.log((await msp(port, new RawImuRequest(), protocol)).toString())
  console.log((await msp(port, new ServoRequest(), protocol)).toString())
  console.log((await msp(port, new MotorRequest(), protocol)).toString())
  console.log((await msp(port, new RcChannelRequest(), protocol)).toString())
  console.log((await msp(port, new RawGpsRequest(), protocol)).toString())
  console.log((await msp(port, new CompGpsRequest(), protocol)).toString())
  console.log((await msp(port, new GpsStatisticsRequest(), protocol)).toString())
  console.log((await msp(port, new AttitudeRequest(), protocol)).toString())
  console.log((await msp(port, new AltitudeRequest(), protocol)).toString())
  console.log((await msp(port, new SonarRequest(), protocol)).toString())
  console.log((await msp(port, new AnalogRequest(), protocol)).toString())
  console.log((await msp(port, new RcTuningRequest(), protocol)).toString())
  console.log((await msp(port, new PIDRequest(), protocol)).toString())
  console.log((await msp(port, new ArmingConfigRequest(), protocol)).toString())
  console.log((await msp(port, new LoopTimeRequest(), protocol)).toString())
  console.log((await msp(port, new ThreeDeeRequest(), protocol)).toString())
  console.log((await msp(port, new BoxNamesRequest(), protocol)).toString())
  console.log((await msp(port, new PidNamesRequest(), protocol)).toString())
  console.log((await msp(port, new WPRequest(), protocol)).toString())
  console.log((await msp(port, new BoxIDsRequest(), protocol)).toString())
  console.log((await msp(port, new ServoMixRulesRequest(), protocol)).toString())
  console.log((await msp(port, new RxConfigRequest(), protocol)).toString())
}

async function loop() {
  for (let i = 0; i < 100; i++) await test()
  port.close()
}

async function main() {
  await test()
  port.close()
}

main()
