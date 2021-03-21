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

export function hex(n, width = 2) {
  return `0x${('0'.repeat(width) + n.toString(16)).substr(-width)}`
}

export function sleep(ms) {
  return new Promise(resolve => { setTimeout(resolve, ms) })
}

export function bitCheck(num, bit) {
  return (num >> bit) % 2 != 0
}

export function switchKeyValues(obj) {
  console.log('obj:', obj)
  return Object
    .keys(obj)
    .reduce((acc, field, index) => ({ ...acc, [obj[field]]: field }), {})
}
