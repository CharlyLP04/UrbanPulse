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

// Polyfill para Response.json crítico en Next.js API Routes bajo Jest/JSDOM antiguo
if (typeof Response !== 'undefined' && !Response.json) {
  Response.json = function(data, init) {
    const headers = new Headers(init?.headers);
    headers.set('Content-Type', 'application/json');
    return new Response(JSON.stringify(data), { ...init, headers });
  };
}

// Mock global del AuthProvider para salvar tests legacy de componentes que ahora lo requieren
jest.mock('@/components/providers/auth-provider', () => ({
  useAuth: () => ({
    user: { id: 'test', name: 'Usuario Prueba', email: 'test@test.com', role: 'user' },
    login: jest.fn().mockResolvedValue({ success: true, role: 'user' }),
    logout: jest.fn(),
    isLoading: false,
  }),
  AuthProvider: ({ children }) => children,
  fetchApi: jest.fn().mockResolvedValue(new Response()),
}), { virtual: true })
