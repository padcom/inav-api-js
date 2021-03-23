import { Request } from '../../Request'
import { Response } from '../../Response'
import { bitCheck } from '../../utils'

export const MSP_CF_SERIAL_CONFIG = 54

export class CfSerialConfigRequest extends Request {
  constructor() {
    super(MSP_CF_SERIAL_CONFIG)
  }
}

const BAUD_RATES_post1_6_3 = [
  'AUTO',
  '1200',
  '2400',
  '4800',
  '9600',
  '19200',
  '38400',
  '57600',
  '115200',
  '230400',
  '250000',
  '460800',
  '921600'
]

const SERIAL_PORT_FUNCTIONS = {
  'MSP': 0,
  'GPS': 1,
  'TELEMETRY_FRSKY': 2,
  'TELEMETRY_HOTT': 3,
  'TELEMETRY_LTM': 4, // LTM replaced MSP
  'TELEMETRY_SMARTPORT': 5,
  'RX_SERIAL': 6,
  'BLACKBOX': 7,
  'TELEMETRY_MAVLINK': 8,
  'TELEMETRY_IBUS': 9,
  'RUNCAM_DEVICE_CONTROL': 10,
  'TBS_SMARTAUDIO': 11,
  'IRC_TRAMP': 12,
  'OPFLOW': 14,
  'LOG': 15,
  'RANGEFINDER': 16,
  'VTX_FFPV': 17,
  'ESC': 18,
  'GSM_SMS': 19,
  'FRSKY_OSD': 20,
  'DJI_FPV': 21,
  'SMARTPORT_MASTER': 23,
}

function serialPortFunctionMaskToFunctions(functionMask) {
  const result = []
  const keys = Object.keys(SERIAL_PORT_FUNCTIONS)
  for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const bit = SERIAL_PORT_FUNCTIONS[key]
      if (bitCheck(functionMask, bit)) {
          result.push(key)
      }
  }

  return result
}

export class CfSerialConfigResponse extends Response {
  get count() {
    return this.payload.byteLength / 7
  }

  get ranges() {
    const BAUD_RATES = BAUD_RATES_post1_6_3
    const result = []
    for (let i = 0; i < this.count; i++) {
      const identifier = this.getUint8(i * 7)
      const functions = serialPortFunctionMaskToFunctions(this.getUint16(i * 7 + 1, true))
      const mspBaudrate = BAUD_RATES[this.getUint8(i * 7 + 3)]
      const sensorsBaudrate = BAUD_RATES[this.getUint8(i * 7 + 4)]
      const telemetryBaudrate = BAUD_RATES[this.getUint8(i * 7 + 5)]
      const blackboxBaudrate = BAUD_RATES[this.getUint8(i * 7 + 6)]

      result.push({
        identifier,
        functions,
        mspBaudrate,
        sensorsBaudrate,
        telemetryBaudrate,
        blackboxBaudrate
      })
    }
    return result
  }
}
