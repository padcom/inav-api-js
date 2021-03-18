#!/usr/bin/env -S node -r esm

import SerialPort from 'serialport'

import { MSP } from './MSP'
import { MSPv1 } from './MSPv1'
import { MSPv2 } from './MSPv2'
import { CommandRegistry } from './CommandRegistry'

const port = new SerialPort('/dev/ttyACM0', { autoOpen: true })
const protocols = {
  [MSPv1.PROTOCOL_ID]: MSPv1,
  [MSPv2.PROTOCOL_ID]: MSPv2
}
const registry = new CommandRegistry()
registry.init()

async function msp(port, request, timeout = 1000, debug = false) {
  if (debug) console.log(request)

  return new Promise((resolve, reject) => {
    const t1 = new Date().getTime()
    const wait = setInterval(() => {
      const t2 = new Date().getTime()
      if (t2 - t1 > timeout) {
        clearInterval(wait)
        reject(new Error('Timeout'))
      }
    }, timeout / 10)

    const STATE_START = 0
    const STATE_CONTINUE_READING_DATA = 1

    let buffer = Buffer.from([])
    let state = STATE_START
    let ProtocolClass = null

    const handler = data => {
      if (debug) console.log('<', data)

      function start() {
        buffer = data

        if (MSP.decodeStartCode(buffer) !== MSP.START_BYTE) {
          if (debug) console.log('[DEBUG] Buffer does not contain packet - ignoring')
          return
        }

        ProtocolClass = protocols[MSP.decodeProtocolCode(buffer)]

        if (ProtocolClass.decodeExpectedPacketLength(buffer) === buffer.length) {
          done()
        } else {
          state = STATE_CONTINUE_READING_DATA
        }
      }

      function more() {
        buffer = Buffer.concat([ buffer, data ])
        if (ProtocolClass.decodeExpectedPacketLength(buffer) === buffer.length) {
          done()
        }
      }
  
      function done() {
        const command = ProtocolClass.decodeCommandCode(buffer)
        if (command === request.command) {
          port.off('data', handler)
          clearInterval(wait)
          const ResponseClass = registry.getCommandByCode(command).response
          const protocol = new ProtocolClass()
          resolve(new ResponseClass(protocol, buffer))
        }
      }

      switch (state) {
        case STATE_START: {
          start()
          break
        }
        case STATE_CONTINUE_READING_DATA: {
          more()
          break          
        }
      }
    }

    port.on('data', handler)

    port.write(request.encode(), e => {
      if (e) {
        reject(e)
      } else {
        if (debug) console.log('>', request.encode())
      }
    })
  })
}

function retry(fn, count) {
  return async (...params) => {
    let counter = count
    while (counter > 0) {
      try {
        return await fn(...params)
      } catch (e) {
        console.log('!!!!!!!!!!!!!!!! Retrying', counter)
        if (--counter === 0) throw e
      }
    }
  }
}

const mspr = retry(msp, 3)

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
  const protocol = new (protocols[MSPv1.PROTOCOL_ID])()
  console.log((await mspr(port, new VersionRequest(protocol))).toString())
  console.log((await mspr(port, new IdentRequest(protocol))).toString())
  console.log((await mspr(port, new StatusExRequest(protocol))).toString())
  console.log((await mspr(port, new ActiveBoxesRequest(protocol))).toString())
  console.log((await mspr(port, new SensorStatusRequest(protocol))).toString())
  console.log((await mspr(port, new RawImuRequest(protocol))).toString())
  console.log((await mspr(port, new ServoRequest(protocol))).toString())
  console.log((await mspr(port, new MotorRequest(protocol))).toString())
  console.log((await mspr(port, new RcChannelRequest(protocol))).toString())
  console.log((await mspr(port, new RawGpsRequest(protocol))).toString())
  console.log((await mspr(port, new CompGpsRequest(protocol))).toString())
  console.log((await mspr(port, new GpsStatisticsRequest(protocol))).toString())
  console.log((await mspr(port, new AttitudeRequest(protocol))).toString())
  console.log((await mspr(port, new AltitudeRequest(protocol))).toString())
  console.log((await mspr(port, new SonarRequest(protocol))).toString())
  console.log((await mspr(port, new AnalogRequest(protocol))).toString())
  console.log((await mspr(port, new RcTuningRequest(protocol))).toString())
  console.log((await mspr(port, new PIDRequest(protocol))).toString())
  console.log((await mspr(port, new ArmingConfigRequest(protocol))).toString())
  console.log((await mspr(port, new LoopTimeRequest(protocol))).toString())
  console.log((await mspr(port, new ThreeDeeRequest(protocol))).toString())
  console.log((await mspr(port, new BoxNamesRequest(protocol))).toString())
  console.log((await mspr(port, new PidNamesRequest(protocol))).toString())
  console.log((await mspr(port, new WPRequest(protocol))).toString())
  console.log((await mspr(port, new BoxIDsRequest(protocol))).toString())
  console.log((await mspr(port, new ServoMixRulesRequest(protocol))).toString())
  console.log((await mspr(port, new RxConfigRequest(protocol))).toString())
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
