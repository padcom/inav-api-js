#!/usr/bin/env -S node -r esm

import SerialPort from 'serialport'
import { MSPv1 } from './MSPv1'
import { MSPv2 } from './MSPv2'
import { CommandRegistry } from './CommandRegistry'
import { BufferedPacketReader } from './BufferedPacketReader'
import { PacketDecoder } from './PacketDecoder'
import { sendAndWaitForResponse } from './communication'

import { VersionRequest } from './command/Version'
import { NameRequest } from './command/Name'
import { FcVariantRequest } from './command/FcVariant'
import { FcVersionRequest } from './command/FcVersion'
import { BuildInfoRequest } from './command/BuildInfo'
import { IdentRequest } from './command/Ident'
import { StatusExRequest } from './command/StatusEx'
import { ActiveBoxesRequest } from './command/ActiveBoxes'
import { SensorStatusRequest } from './command/SensorStatus'
import { SensorConfigRequest } from './command/SensorConfig'
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
import { NavPosHoldRequest } from './command/NavPosHold'
import { CalibrationDataRequest } from './command/CalibrationData'
import { PositionEstimationConfigRequest } from './command/PositionEstimationConfig'
import { RthAndLandConfigRequest } from './command/RthAndLandConfig'
import { ChannelForwardingRequest } from './command/ChannelForwarding'
import { ModeRangesRequest } from './command/ModeRanges'
import { LedColorsRequest } from './command/LedColors'
import { AdjustmentRangesRequest } from './command/AdjustmentRanges'
import { CfSerialConfigRequest } from './command/CfSerialConfig'
import { DataFlashSummaryRequest } from './command/DataFlashSummary'
import { FailsafeConfigRequest } from './command/FailsafeConfig'

const registry = new CommandRegistry()
await registry.init()

const port = new SerialPort('/dev/ttyACM0')

const decodedPackages = port
  .pipe(new BufferedPacketReader())
  .pipe(new PacketDecoder(registry))

decodedPackages.on('data', response => {
  console.log('[MAIN]', response.toString())
})

async function sendTestRequest(request, protocol) {
  console.log('[TEST]', (await sendAndWaitForResponse(port, request, protocol, registry)).toString())
}

async function test(protocol) {
  await sendTestRequest(new VersionRequest(), protocol)
  await sendTestRequest(new NameRequest(), protocol)
  await sendTestRequest(new FcVariantRequest(), protocol)
  await sendTestRequest(new FcVersionRequest(), protocol)
  await sendTestRequest(new BuildInfoRequest(), protocol)
  await sendTestRequest(new IdentRequest(), protocol)
  await sendTestRequest(new StatusExRequest(), protocol)
  await sendTestRequest(new ActiveBoxesRequest(), protocol)
  await sendTestRequest(new SensorStatusRequest(), protocol)
  await sendTestRequest(new SensorConfigRequest(), protocol)
  await sendTestRequest(new RawImuRequest(), protocol)
  await sendTestRequest(new ServoRequest(), protocol)
  await sendTestRequest(new MotorRequest(), protocol)
  await sendTestRequest(new RcChannelRequest(), protocol)
  await sendTestRequest(new RawGpsRequest(), protocol)
  await sendTestRequest(new CompGpsRequest(), protocol)
  await sendTestRequest(new GpsStatisticsRequest(), protocol)
  await sendTestRequest(new AttitudeRequest(), protocol)
  await sendTestRequest(new AltitudeRequest(), protocol)
  await sendTestRequest(new SonarRequest(), protocol)
  await sendTestRequest(new AnalogRequest(), protocol)
  await sendTestRequest(new RcTuningRequest(), protocol)
  await sendTestRequest(new PIDRequest(), protocol)
  await sendTestRequest(new ArmingConfigRequest(), protocol)
  await sendTestRequest(new LoopTimeRequest(), protocol)
  await sendTestRequest(new ThreeDeeRequest(), protocol)
  await sendTestRequest(new BoxNamesRequest(), protocol)
  await sendTestRequest(new PidNamesRequest(), protocol)
  await sendTestRequest(new WPRequest(), protocol)
  await sendTestRequest(new BoxIDsRequest(), protocol)
  await sendTestRequest(new ServoMixRulesRequest(), protocol)
  await sendTestRequest(new RxConfigRequest(), protocol)
  await sendTestRequest(new NavPosHoldRequest(), protocol)
  await sendTestRequest(new CalibrationDataRequest(), protocol)
  await sendTestRequest(new PositionEstimationConfigRequest(), protocol)
  await sendTestRequest(new RthAndLandConfigRequest(), protocol)
  await sendTestRequest(new ChannelForwardingRequest(), protocol)
  await sendTestRequest(new ModeRangesRequest(), protocol)
  await sendTestRequest(new LedColorsRequest(), protocol)
  await sendTestRequest(new AdjustmentRangesRequest(), protocol)
  await sendTestRequest(new CfSerialConfigRequest(), protocol)
  await sendTestRequest(new DataFlashSummaryRequest(), protocol)
  await sendTestRequest(new FailsafeConfigRequest(), protocol)
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

await main()
