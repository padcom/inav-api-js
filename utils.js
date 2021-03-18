export function getObjectPropertyNames(obj) {
  return Object
    .getOwnPropertyNames(Object.getPrototypeOf(obj))
    .filter(prop => typeof obj[prop] !== 'function')
}

export function getKeyForValue(obj, value) {
  return Object.entries(obj).find(([k, v]) => v === value)
}

export function getByteAtOffset(buffer, offset) {
  if (buffer instanceof Buffer) return buffer[offset]
  else if (buffer instanceof DataView) return buffer.getUint8(offset)
  else throw new Error('Don\'t know how to get data from', buffer.constructor)
}

export function readonly(object, field, value) {
  Object.defineProperty(object, field, {
    get() { return value }
  })
}

export function hex(n) {
  return `0x${('00' + n.toString(16)).substr(-2)}`
}

export function sleep(ms) {
  return new Promise(resolve => { setTimeout(resolve, ms) })
}
