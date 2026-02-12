module.exports = {
  clearMocks: true,

  projects: [
    {
      // Tests de configuración / CI (Node puro)
      displayName: 'config-tests',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/__tests__/config/**/*.test.js',
      ],
    },

    {
      // Tests de UI / accesibilidad / componentes
      displayName: 'ui-tests',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

      testMatch: [
        '<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}',
      ],

    
      testPathIgnorePatterns: [
        '<rootDir>/__tests__/config/',
        '<rootDir>/.next/',
        '<rootDir>/node_modules/',
      ],

      moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1',
      },

      collectCoverageFrom: [
        'components/**/*.{js,jsx,ts,tsx}',
        'app/**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
      ],

      coverageThreshold: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  ],
}
