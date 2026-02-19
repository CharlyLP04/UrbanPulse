import 'whatwg-fetch'
import { TextEncoder, TextDecoder } from 'util'
import { randomUUID } from 'crypto'
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

if (!global.crypto) {
  global.crypto = {}
}

if (!global.crypto.randomUUID) {
  global.crypto.randomUUID = randomUUID
}

expect.extend(toHaveNoViolations)
