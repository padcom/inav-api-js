#!/usr/bin/env -S node -r esm

import SerialPort from 'serialport'
import { ReconnectionManager } from './ReconnectionManager'
import { MSPv1 } from './MSPv1'
import { MSPv2 } from './MSPv2'
import { CommandRegistry } from './CommandRegistry'
import { BufferedPacketReader } from './BufferedPacketReader'
import { PacketDecoder } from './PacketDecoder'
import { sendAndWaitForResponse } from './communication'
import { CLI } from './CLI'
import { waitForSingleEvent } from './utils'

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
import { RcRequest } from './command/Rc'
import { RawGpsRequest } from './command/RawGps'
import { CompGpsRequest } from './command/CompGps'
import { GpsStatisticsRequest } from './command/GpsStatistics'
import { AttitudeRequest } from './command/Attitude'
import { AltitudeRequest } from './command/Altitude'
import { SonarRequest } from './command/Sonar'
import { AnalogRequest } from './command/Analog'
import { RcTuningRequest } from './command/RcTuning'
import { PidRequest } from './command/Pid'
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
import { SdCardSummaryRequest } from './command/SdCardSummary'
import { BlackBoxConfigRequest } from './command/BlackBoxConfig'
import { TransponderConfigRequest } from './command/TransponderConfig'
import { VtxConfigRequest } from './command/VtxConfig'
import { AdvancedConfigRequest } from './command/AdvancedConfig'
import { FilterConfigRequest } from './command/FilterConfig'
import { PidAdvancedRequest } from './command/PidAdvanced'
import { MotorPinsRequest } from './command/MotorPins'
import { ServoConfigurationsRequest } from './command/ServoConfigurations'
import { RcDeadbandRequest } from './command/RcDeadband'
import { SensorAlignmentRequest } from './command/SensorAlignment'
import { RtcRequest } from './command/Rtc'
import { UidRequest } from './command/Uid'
import { AccTrimRequest } from './command/AccTrim'
import { GpsSvInfoRequest } from './command/GpsSvInfo'
import { RxMapRequest } from './command/RxMap'
import { BfConfigRequest } from './command/BfConfig'
import { BfBuildInfoRequest } from './command/BfBuildInfo'
import { SetRebootRequest } from './command/SetReboot'

async function sendTestRequest(port, registry, request, protocol, timeout = 300) {
  console.log('[TEST]', (await sendAndWaitForResponse(port, request, protocol, registry, timeout)).toString())
}

async function test(port, registry, protocol) {
  const decodedPackages = port
    .pipe(new BufferedPacketReader())
    .pipe(new PacketDecoder(registry))

  decodedPackages.on('data', response => {
    console.log('[MAIN]', response.toString())
  })

  console.log('[MAIN] Testing commands')

  await sendTestRequest(port, registry, new VersionRequest(), protocol)
  await sendTestRequest(port, registry, new NameRequest(), protocol)
  await sendTestRequest(port, registry, new FcVariantRequest(), protocol)
  await sendTestRequest(port, registry, new FcVersionRequest(), protocol)
  await sendTestRequest(port, registry, new BuildInfoRequest(), protocol)
  await sendTestRequest(port, registry, new IdentRequest(), protocol)
  await sendTestRequest(port, registry, new StatusExRequest(), protocol)
  await sendTestRequest(port, registry, new ActiveBoxesRequest(), protocol)
  await sendTestRequest(port, registry, new SensorStatusRequest(), protocol)
  await sendTestRequest(port, registry, new SensorConfigRequest(), protocol)
  await sendTestRequest(port, registry, new RawImuRequest(), protocol)
  await sendTestRequest(port, registry, new ServoRequest(), protocol)
  await sendTestRequest(port, registry, new MotorRequest(), protocol)
  await sendTestRequest(port, registry, new RcRequest(), protocol)
  await sendTestRequest(port, registry, new RawGpsRequest(), protocol)
  await sendTestRequest(port, registry, new CompGpsRequest(), protocol)
  await sendTestRequest(port, registry, new GpsStatisticsRequest(), protocol)
  await sendTestRequest(port, registry, new AttitudeRequest(), protocol)
  await sendTestRequest(port, registry, new AltitudeRequest(), protocol)
  await sendTestRequest(port, registry, new SonarRequest(), protocol)
  await sendTestRequest(port, registry, new AnalogRequest(), protocol)
  await sendTestRequest(port, registry, new RcTuningRequest(), protocol)
  await sendTestRequest(port, registry, new PidRequest(), protocol)
  await sendTestRequest(port, registry, new ArmingConfigRequest(), protocol)
  await sendTestRequest(port, registry, new LoopTimeRequest(), protocol)
  await sendTestRequest(port, registry, new ThreeDeeRequest(), protocol)
  await sendTestRequest(port, registry, new BoxNamesRequest(), protocol)
  await sendTestRequest(port, registry, new PidNamesRequest(), protocol)
  await sendTestRequest(port, registry, new WPRequest(), protocol)
  await sendTestRequest(port, registry, new BoxIDsRequest(), protocol)
  await sendTestRequest(port, registry, new ServoMixRulesRequest(), protocol)
  await sendTestRequest(port, registry, new RxConfigRequest(), protocol)
  await sendTestRequest(port, registry, new NavPosHoldRequest(), protocol)
  await sendTestRequest(port, registry, new CalibrationDataRequest(), protocol)
  await sendTestRequest(port, registry, new PositionEstimationConfigRequest(), protocol)
  await sendTestRequest(port, registry, new RthAndLandConfigRequest(), protocol)
  await sendTestRequest(port, registry, new ChannelForwardingRequest(), protocol)
  await sendTestRequest(port, registry, new ModeRangesRequest(), protocol)
  await sendTestRequest(port, registry, new LedColorsRequest(), protocol)
  await sendTestRequest(port, registry, new AdjustmentRangesRequest(), protocol)
  await sendTestRequest(port, registry, new CfSerialConfigRequest(), protocol)
  await sendTestRequest(port, registry, new DataFlashSummaryRequest(), protocol)
  await sendTestRequest(port, registry, new FailsafeConfigRequest(), protocol)
  await sendTestRequest(port, registry, new SdCardSummaryRequest(), protocol)
  await sendTestRequest(port, registry, new BlackBoxConfigRequest(), protocol)
  await sendTestRequest(port, registry, new TransponderConfigRequest(), protocol)
  await sendTestRequest(port, registry, new VtxConfigRequest(), protocol)
  await sendTestRequest(port, registry, new AdvancedConfigRequest(), protocol)
  await sendTestRequest(port, registry, new FilterConfigRequest(), protocol)
  await sendTestRequest(port, registry, new PidAdvancedRequest(), protocol)
  await sendTestRequest(port, registry, new MotorPinsRequest(), protocol)
  await sendTestRequest(port, registry, new ServoConfigurationsRequest(), protocol)
  await sendTestRequest(port, registry, new RcDeadbandRequest(), protocol)
  await sendTestRequest(port, registry, new SensorAlignmentRequest(), protocol)
  await sendTestRequest(port, registry, new RtcRequest(), protocol)
  await sendTestRequest(port, registry, new UidRequest(), protocol)
  await sendTestRequest(port, registry, new AccTrimRequest(), protocol)
  await sendTestRequest(port, registry, new GpsSvInfoRequest(), protocol)
  await sendTestRequest(port, registry, new RxMapRequest(), protocol)
  await sendTestRequest(port, registry, new BfConfigRequest(), protocol)
  await sendTestRequest(port, registry, new BfBuildInfoRequest(), protocol)

  console.log('[MAIN] Done')
}

async function main(port, registry) {
  await test(port, registry, new MSPv1())
  await test(port, registry, new MSPv2())
}

async function cli(port) {
  console.log('[MAIN] Testing CLI enter/exit')
  const cli = new CLI(port)
  await cli.enter()
  console.log(await cli.command('version'))
  console.log(await cli.command('diff'))
  console.log(await cli.command('help'))
  console.log(await cli.command('set'))
  await cli.exit()
  await reconnectionManager.connect()
  console.log('[MAIN] Done')
}

const registry = new CommandRegistry()
await registry.init()

const port = new SerialPort('/dev/ttyACM0')
port.on('open', () => { console.log('[MAIN] Port open') })
port.on('close', () => { console.log('[MAIN] Port closed')})

await waitForSingleEvent(port, 'open', 2000)

const reconnectionManager = new ReconnectionManager(port)
reconnectionManager.on('disconnected', () => { console.log('[MAIN] Disconnected') })
reconnectionManager.on('available', port => { console.log(`[MAIN] Port ${port.path} available`)})
reconnectionManager.on('reconnecting', retry => { console.log(`[MAIN] Restoring connection (retries: ${retry})`)})
reconnectionManager.on('reconnected', () => { console.log('[MAIN] Reconnected') })

await reconnectionManager.connect()

await cli(port)
await main(port, registry)

reconnectionManager.close()
port.close()
