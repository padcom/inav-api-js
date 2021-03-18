import { Request } from '../Request.js'
import { Response } from '../Response.js'

export const MSP_RX_CONFIG = 44

export class RxConfigRequest extends Request {
  constructor(protocol) {
    super(protocol, MSP_RX_CONFIG)
  }
}

export class RxConfigResponse extends Response {
  get serialReceiverProvider() {
    return this.getUint8(0)
  }

  get maxCheck() {
    return this.getUint16(1, true)
  }

  get midRC() {
    return this.getUint16(3, true)
  }

  get minCheck() {
    return this.getUint16(5, true)
  }

  get spektrumSateliteBind() {
    return this.getUint8(7)
  }

  get rxMinUSec() {
    return this.getUint16(8, true)
  }

  get rxMaxUSec() {
    return this.getUint16(10, true)
  }

  get spiRxProtocol() {
    return this.getUint8(14)
  }

  get spiRxId() {
    return this.getUint32(15, true)
  }

  get spiRxChannelCount() {
    return this.getUint8(19)
  }

  get receiverType() {
    return this.getUint8(21)
  }
}
