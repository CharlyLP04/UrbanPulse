const fs = require('fs')

describe('Configuration by Alexis', () => {
  test('package.json has required scripts', () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

    expect(packageJson.scripts.test).toBeDefined()
    expect(packageJson.scripts.lint).toBeDefined()
    expect(packageJson.scripts.typecheck).toBeDefined()
  })

  test('lint script exists', () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    expect(packageJson.scripts.lint).toBeDefined()
  })

  test('typecheck script exists', () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    expect(packageJson.scripts.typecheck).toBeDefined()
  })
})
