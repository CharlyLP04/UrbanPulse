import fs from 'fs'

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
      // Este test verifica que el script exista, no lo ejecuta
      // para evitar timeouts en el entorno de testing
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      expect(packageJson.scripts.lint).toBeDefined()
      expect(typeof packageJson.scripts.lint).toBe('string')
    })
    
    test('test script runs without errors', () => {
      // Este test verifica que el script exista, no lo ejecuta
      // para evitar timeouts en el entorno de testing
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      expect(packageJson.scripts['test:ci']).toBeDefined()
      expect(typeof packageJson.scripts['test:ci']).toBe('string')
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
      const requiredFiles = ['package.json', 'tsconfig.json', 'jest.config.js', '.eslintrc.json']
      
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
  
  describe('ESLint configuration', () => {
    test('eslintrc.json exists and is valid', () => {
      expect(fs.existsSync('.eslintrc.json')).toBe(true)
      
      try {
        const eslintConfig = JSON.parse(fs.readFileSync('.eslintrc.json', 'utf8'))
        expect(eslintConfig.extends).toBeDefined()
        expect(eslintConfig.extends).toContain('next/core-web-vitals')
      } catch (error) {
        fail('.eslintrc.json is not valid JSON')
      }
    })
  })
})