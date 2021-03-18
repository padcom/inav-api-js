#!/usr/bin/env -S node -r esm

import SerialPort from 'serialport'
import { MSPv1 } from './MSPv1'
import { MSPv2 } from './MSPv2'
import { send } from './send'

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

const port = new SerialPort('/dev/ttyACM0')

async function test(protocol) {
  console.log((await send(port, new VersionRequest(), protocol)).toString())
  console.log((await send(port, new IdentRequest(), protocol)).toString())
  console.log((await send(port, new StatusExRequest(), protocol)).toString())
  console.log((await send(port, new ActiveBoxesRequest(), protocol)).toString())
  console.log((await send(port, new SensorStatusRequest(), protocol)).toString())
  console.log((await send(port, new RawImuRequest(), protocol)).toString())
  console.log((await send(port, new ServoRequest(), protocol)).toString())
  console.log((await send(port, new MotorRequest(), protocol)).toString())
  console.log((await send(port, new RcChannelRequest(), protocol)).toString())
  console.log((await send(port, new RawGpsRequest(), protocol)).toString())
  console.log((await send(port, new CompGpsRequest(), protocol)).toString())
  console.log((await send(port, new GpsStatisticsRequest(), protocol)).toString())
  console.log((await send(port, new AttitudeRequest(), protocol)).toString())
  console.log((await send(port, new AltitudeRequest(), protocol)).toString())
  console.log((await send(port, new SonarRequest(), protocol)).toString())
  console.log((await send(port, new AnalogRequest(), protocol)).toString())
  console.log((await send(port, new RcTuningRequest(), protocol)).toString())
  console.log((await send(port, new PIDRequest(), protocol)).toString())
  console.log((await send(port, new ArmingConfigRequest(), protocol)).toString())
  console.log((await send(port, new LoopTimeRequest(), protocol)).toString())
  console.log((await send(port, new ThreeDeeRequest(), protocol)).toString())
  console.log((await send(port, new BoxNamesRequest(), protocol)).toString())
  console.log((await send(port, new PidNamesRequest(), protocol)).toString())
  console.log((await send(port, new WPRequest(), protocol)).toString())
  console.log((await send(port, new BoxIDsRequest(), protocol)).toString())
  console.log((await send(port, new ServoMixRulesRequest(), protocol)).toString())
  console.log((await send(port, new RxConfigRequest(), protocol)).toString())
}

async function loop() {
  for (let i = 0; i < 100; i++) {
    await test(new MSPv1())
    await test(new MSPv2())
  }
  port.close()
}

async function main() {
  await test(new MSPv1())
  await test(new MSPv2())
  port.close()
}

main()
