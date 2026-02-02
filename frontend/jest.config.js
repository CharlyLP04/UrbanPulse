// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',

  clearMocks: true,

  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },

  // Ignorar carpetas que no deben testearse
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  // Asegura que Jest detecte correctamente los tests
  testMatch: [
    '**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)',
  ],

  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],

  // Umbral mínimo de cobertura para CI
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

module.exports = customJestConfig
