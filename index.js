#!/usr/bin/env -S node -r esm

import SerialPort from 'serialport'
import './extensions'
import { Logger, LogLevel } from './logger'
import { ReconnectionManager } from './ReconnectionManager'
import { MSPv1 } from './protocol/MSPv1'
import { MSPv2 } from './protocol/MSPv2'
import { CommandRegistry } from './CommandRegistry'
import { BufferedPacketReader } from './BufferedPacketReader'
import { PacketDecoder } from './PacketDecoder'
import { sendAndWaitForResponse, mspSend } from './communication'
import { CLI } from './CLI'
import { waitForSingleEvent, sleep, constrain } from './utils'

import { VersionRequest } from './command/v1/Version'
import { NameRequest } from './command/v1/Name'
import { FcVariantRequest } from './command/v1/FcVariant'
import { FcVersionRequest } from './command/v1/FcVersion'
import { BuildInfoRequest } from './command/v1/BuildInfo'
import { IdentRequest } from './command/v1/Ident'
import { StatusExRequest } from './command/v1/StatusEx'
import { ActiveBoxesRequest } from './command/v1/ActiveBoxes'
import { SensorStatusRequest } from './command/v1/SensorStatus'
import { SensorConfigRequest } from './command/v1/SensorConfig'
import { RawImuRequest } from './command/v1/RawImu'
import { ServoRequest } from './command/v1/Servo'
import { MotorRequest } from './command/v1/Motor'
import { RcRequest } from './command/v1/Rc'
import { RawGpsRequest } from './command/v1/RawGps'
import { CompGpsRequest } from './command/v1/CompGps'
import { GpsStatisticsRequest } from './command/v1/GpsStatistics'
import { AttitudeRequest } from './command/v1/Attitude'
import { AltitudeRequest } from './command/v1/Altitude'
import { SonarRequest } from './command/v1/Sonar'
import { AnalogRequest } from './command/v1/Analog'
import { RcTuningRequest } from './command/v1/RcTuning'
import { PidRequest } from './command/v1/Pid'
import { ArmingConfigRequest } from './command/v1/ArmingConfig'
import { LoopTimeRequest } from './command/v1/LoopTime'
import { ThreeDeeRequest } from './command/v1/3D'
import { BoxNamesRequest } from './command/v1/BoxNames'
import { PidNamesRequest } from './command/v1/PidNames'
import { WPRequest } from './command/v1/WP'
import { BoxIDsRequest } from './command/v1/BoxIDs'
import { ServoMixRulesRequest } from './command/v1/ServoMixRules'
import { RxConfigRequest } from './command/v1/RxConfig'
import { NavPosHoldRequest } from './command/v1/NavPosHold'
import { CalibrationDataRequest } from './command/v1/CalibrationData'
import { PositionEstimationConfigRequest } from './command/v1/PositionEstimationConfig'
import { RthAndLandConfigRequest } from './command/v1/RthAndLandConfig'
import { ChannelForwardingRequest } from './command/v1/ChannelForwarding'
import { ModeRangesRequest } from './command/v1/ModeRanges'
import { LedColorsRequest } from './command/v1/LedColors'
import { AdjustmentRangesRequest } from './command/v1/AdjustmentRanges'
import { CfSerialConfigRequest } from './command/v1/CfSerialConfig'
import { DataFlashSummaryRequest } from './command/v1/DataFlashSummary'
import { FailsafeConfigRequest } from './command/v1/FailsafeConfig'
import { SdCardSummaryRequest } from './command/v1/SdCardSummary'
import { BlackBoxConfigRequest } from './command/v1/BlackBoxConfig'
import { TransponderConfigRequest } from './command/v1/TransponderConfig'
import { VtxConfigRequest } from './command/v1/VtxConfig'
import { AdvancedConfigRequest } from './command/v1/AdvancedConfig'
import { FilterConfigRequest } from './command/v1/FilterConfig'
import { PidAdvancedRequest } from './command/v1/PidAdvanced'
import { MotorPinsRequest } from './command/v1/MotorPins'
import { ServoConfigurationsRequest } from './command/v1/ServoConfigurations'
import { RcDeadbandRequest } from './command/v1/RcDeadband'
import { SensorAlignmentRequest } from './command/v1/SensorAlignment'
import { RtcRequest } from './command/v1/Rtc'
import { UidRequest } from './command/v1/Uid'
import { AccTrimRequest } from './command/v1/AccTrim'
import { GpsSvInfoRequest } from './command/v1/GpsSvInfo'
import { RxMapRequest } from './command/v1/RxMap'
import { BfConfigRequest } from './command/v1/BfConfig'
import { BfBuildInfoRequest } from './command/v1/BfBuildInfo'
import { SetRebootRequest } from './command/v1/SetReboot'

import * as DataType from './model/DataType'

import { SettingRequest as MSPv2SettingRequest } from './command/v2/Setting'
import { SetSettingRequest as MSPv2SetSettingRequest } from './command/v2/SetSetting'
import { CommonSettingInfoRequest as MSPv2CommonSettingInfoRequest } from './command/v2/CommonSettingInfo'
import { CommonPgListRequest as MSPv2CommonPgListRequest } from './command/v2/CommonPgList'
import { CommonTzRequest as MSPv2CommonTzRequest } from './command/v2/CommonTz'
import { CommonMotorMixerRequest as MSPv2CommonMotorMixerRequest } from './command/v2/CommonMotorMixer'
import { CommonSerialConfigRequest as MSPv2CommonSerialConfigRequest } from './command/v2/CommonSerialConfig'
import { InavAnalogRequest as MSPv2InavAnalogRequest } from './command/v2/InavAnalog'
import { InavOpticalFlowRequest as MSPv2InavOpticalFlowRequest } from './command/v2/InavOpticalFlow'
import { InavMiscRequest as MSPv2InavMiscRequest } from './command/v2/InavMisc'
import { InavBatteryConfigRequest as MSPv2InavBatteryConfigRequest } from './command/v2/InavBatteryConfig'
import { InavRateProfileRequest as MSPv2InavRateProfileRequest } from './command/v2/InavRateProfile'
import { InavAirSpeedRequest as MSPv2InavAirSpeedRequest } from './command/v2/InavAirSpeed'


const log = Logger.getLogger('MAIN')

async function sendTestRequest(port, registry, request, protocol, timeout = 1000) {
  const response = await sendAndWaitForResponse(port, request, protocol, registry, timeout)
  log.info('TEST', response.toString())

  return response
}

async function testReboot(port, protocol, reconnectionManager) {
  const request = new SetRebootRequest()
  log.info('TEST Reboot', await mspSend(port, request, protocol))
  log.info('TEST Port closed', await waitForSingleEvent(port, 'close', 5000))
  log.info('TEST Reconnected', await reconnectionManager.connect())
}

async function test(port, registry, protocol) {
  log.info('Testing commands')

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

  log.info('Done')
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

async function testSettingIndexFromList(port, protocol, setting, value) {
  const configuration = await sendAndWaitForResponse(port, new MSPv2CommonSettingInfoRequest(setting), protocol, registry)
  const index = configuration.values.findIndex(item => item == value)
  assert(index !== -1, `Unable to find index of value ${value} in ${configuration.values}`)
  await sendAndWaitForResponse(port, new MSPv2SetSettingRequest(configuration.index, configuration.type, index), protocol, registry)
  const response = await sendAndWaitForResponse(port, new MSPv2CommonSettingInfoRequest(setting), protocol, registry)
  assert(index === response.value, `Failed to set setting ${setting} to value ${value} (index: ${index}); got ${response.value}`)
  log.info(`TEST Successfully set ${setting} to ${value}`)
}

async function testSettingString(port, protocol, setting, value) {
  const configuration = await sendAndWaitForResponse(port, new MSPv2CommonSettingInfoRequest(setting), protocol, registry)
  await sendAndWaitForResponse(port, new MSPv2SetSettingRequest(configuration.index, configuration.type, value), protocol, registry)
  const response = await sendAndWaitForResponse(port, new MSPv2CommonSettingInfoRequest(setting), protocol, registry)
  assert(value === response.value, `Failed to set setting ${setting} to value ${value}; got ${response.value}`)
  log.info(`TEST Successfully set ${setting} to ${value}`)
}

async function testv2(port, request) {
  const protocol = new MSPv2()
  await testSettingIndexFromList(port, protocol, 'serialrx_provider', 'SBUS')
  await testSettingString(port, protocol, 'name', Date.now().toString())

  await sendTestRequest(port, registry, new MSPv2SettingRequest(1), protocol)
  await sendTestRequest(port, registry, new MSPv2CommonSettingInfoRequest('serialrx_inverted'), protocol)
  await sendTestRequest(port, registry, new MSPv2CommonSettingInfoRequest('display_force_sw_blink'), protocol)
  await sendTestRequest(port, registry, new MSPv2CommonPgListRequest(), protocol)
  await sendTestRequest(port, registry, new MSPv2CommonTzRequest(), protocol)
  await sendTestRequest(port, registry, new MSPv2CommonMotorMixerRequest(), protocol)
  await sendTestRequest(port, registry, new MSPv2CommonSerialConfigRequest(), protocol)
  await sendTestRequest(port, registry, new MSPv2InavAnalogRequest(), protocol)
  await sendTestRequest(port, registry, new MSPv2InavOpticalFlowRequest(), protocol)
  await sendTestRequest(port, registry, new MSPv2InavMiscRequest(), protocol)
  await sendTestRequest(port, registry, new MSPv2InavBatteryConfigRequest(), protocol)
  await sendTestRequest(port, registry, new MSPv2InavRateProfileRequest(), protocol)
  await sendTestRequest(port, registry, new MSPv2InavAirSpeedRequest(), protocol)
}

async function main(port, registry) {
  const decodedPackages = port
    .pipe(new BufferedPacketReader())
    .pipe(new PacketDecoder(registry))

  decodedPackages.on('data', response => {
    log.info(response.toString())
  })

  const mspv1 = new MSPv1()
  mspv1.on('encoding', args => {
    log.info('Encoding V1 command', args)
  })
  mspv1.on('encoded', buffer => {
    log.info('Encoded V1 command', buffer)
  })
  mspv1.on('decoding', buffer => {
    log.info('Decoding V1 buffer', buffer)
  })
  mspv1.on('decoded', args => {
    log.info('Decoded V1 buffer', args)
  })

  const mspv2 = new MSPv2()
  mspv2.on('encoding', args => {
    log.debug('Encoding V2 command', args)
  })
  mspv1.on('encoded', buffer => {
    log.debug('Encoded V1 command', buffer)
  })
  mspv2.on('decoding', buffer => {
    log.debug('Decoding V2 buffer', buffer)
  })
  mspv1.on('decoded', args => {
    log.debug('Decoded V1 buffer', args)
  })

  await test(port, registry, mspv1)
  await test(port, registry, mspv2)
}

async function mainv2(port, registry) {
  await testv2(port, registry)
}

async function cli(port) {
  log.info('Testing CLI enter/exit')
  const cli = new CLI(port)
  await cli.enter()
  console.log(await cli.command('version'))
  console.log(await cli.command('diff'))
  console.log(await cli.command('help'))
  console.log(await cli.command('set'))
  await cli.exit()
  await reconnectionManager.connect()
  log.info('Done')
}

Logger.getLogger('MAIN').level = LogLevel.info
// Logger.getLogger('MSP').level = LogLevel.trace
// Logger.getLogger('MSPV1').level = LogLevel.trace
// Logger.getLogger('MSPV2').level = LogLevel.trace
// Logger.getLogger('TIMER').level = LogLevel.trace
// Logger.getLogger('REQUEST').level = LogLevel.trace
// Logger.getLogger('RESPONSE').level = LogLevel.trace
// Logger.getLogger('COMM').level = LogLevel.trace

Logger.events.on('trace', ({ source, args }) => console.log(`TRACE [${source}]`, ...args))
Logger.events.on('debug', ({ source, args }) => console.log(`TRACE [${source}]`, ...args))
Logger.events.on('info', ({ source, args }) => console.log(`INFO  [${source}]`, ...args))
Logger.events.on('warn', ({ source, args }) => console.log(`WARN  [${source}]`, ...args))
Logger.events.on('error', ({ source, args }) => console.log(`ERROR [${source}]`, ...args))

const port = new SerialPort('/dev/ttyACM0')
port.on('open', () => { log.info('Port open') })
port.on('close', () => { log.info('Port closed')})

await waitForSingleEvent(port, 'open', 2000)

const reconnectionManager = new ReconnectionManager(port)
reconnectionManager.on('disconnected', () => { log.info('Disconnected') })
reconnectionManager.on('available', port => { log.info(`Port ${port.path} available`)})
reconnectionManager.on('reconnecting', retry => { log.info(`Restoring connection (retries: ${retry})`)})
reconnectionManager.on('reconnected', () => { log.info('Reconnected') })

await reconnectionManager.connect()

const registry = new CommandRegistry()
await registry.init()

await testReboot(port, new MSPv1(), reconnectionManager)
await cli(port)
await main(port, registry)
await mainv2(port, registry)

reconnectionManager.close()
port.close()
