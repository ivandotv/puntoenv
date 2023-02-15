import { setupEnv } from 'index'
import path from 'node:path'

describe('Dev File', () => {
  test('env dev test', () => {
    process.env.NODE_ENV = 'DEVELOPMENT'
    const filePath = path.resolve(__dirname, './')
    setupEnv(`${filePath}/`)

    expect(process.env.MY_ENV).toEqual('.env.development.local')
    expect(process.env.FROM_EXPAND).toEqual('my_expanded_value')
  })
})
