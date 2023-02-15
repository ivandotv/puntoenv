import { setupEnv } from 'index'
import path from 'node:path'

describe('env: TEST', () => {
  test('do not load .local files', () => {
    process.env.NODE_ENV = 'TEST'
    const filePath = path.resolve(__dirname, './')
    setupEnv(`${filePath}/`)

    expect(process.env.MY_ENV_TEST_LOCAL).toBeUndefined()
    expect(process.env.MY_ENV_LOCAL).toBeUndefined()
    expect(process.env.FROM_EXPAND).toEqual('my_expanded_value')
  })
})
