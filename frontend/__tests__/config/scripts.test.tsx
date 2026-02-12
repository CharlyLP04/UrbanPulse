import { execSync } from 'child_process'
import * as fs from 'fs'

describe('Configuration Tests by Alexis', () => {
  describe('package.json scripts', () => {
    test('has required scripts', () => {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      const requiredScripts = ['lint', 'test', 'build', 'test:ci']
      
      requiredScripts.forEach(script => {
        expect(packageJson.scripts[script]).toBeDefined()
      })
    })

    test('lint script runs without errors', () => {
      try {
        execSync('npm run lint', { stdio: 'pipe' })
        expect(true).toBe(true)
      } catch (error) {
        expect(error.status).toBe(0)
      }
    })

    test('test script runs without errors', () => {
      try {
        execSync('npm run test:ci', { stdio: 'pipe' })
        expect(true).toBe(true)
      } catch (error) {
        console.error('Tests failed:', error);
        fail('Tests failed - need to investigate')
      }
    })
  })

  describe('project structure', () => {
    test('required directories exist', () => {
      const requiredDirs = ['components', 'app', '__tests__', 'lib', 'types']
      
      requiredDirs.forEach(dir => {
        expect(fs.existsSync(dir)).toBe(true)
      })
    })

    test('required files exist', () => {
      const requiredFiles = ['package.json', 'tsconfig.json', 'jest.config.js']
      
      requiredFiles.forEach(file => {
        expect(fs.existsSync(file)).toBe(true)
      })
    })
  })

  describe('TypeScript configuration', () => {
    test('tsconfig.json exists and is valid', () => {
      expect(fs.existsSync('tsconfig.json')).toBe(true)
      
      try {
        const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'))
        expect(tsConfig.compilerOptions).toBeDefined()
        expect(tsConfig.compilerOptions.strict).toBe(true)
      } catch (error) {
        fail('tsconfig.json is not valid JSON')
      }
    })
  })
})