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

if (!Response.json) {
  Response.json = function (data, init = {}) {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
    })
  }
}

expect.extend(toHaveNoViolations)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

const originalMatchMedia = window.matchMedia

export function mockMatchMedia(mockMatches) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: mockMatches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

export function resetMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: originalMatchMedia,
  })
}

// Mock HTMLCanvasElement for axe-core color contrast checks in JSDOM
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = jest.fn();
}
