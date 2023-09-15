import { setupEnv } from 'index'

describe('env: TEST', () => {
  test('do not load .local files', () => {
    process.env.NODE_ENV = 'TEST'
    process.env.MY_ENV = 'original'

    setupEnv(__dirname)

    expect(process.env.MY_ENV_TEST_LOCAL).toBeUndefined()
    expect(process.env.MY_ENV_LOCAL).toBeUndefined()
    expect(process.env.FROM_EXPAND).toEqual('my_expanded_value')
    expect(process.env.MY_ENV).toEqual('original')
  })

  describe('Custom ENV var', () => {
    test('do not load .local files', () => {
      process.env.NODE_CONTEXT = 'TEST'
      process.env.MY_ENV = 'original'

      setupEnv(__dirname, 'NODE_CONTEXT')

      expect(process.env.MY_ENV_TEST_LOCAL).toBeUndefined()
      expect(process.env.MY_ENV_LOCAL).toBeUndefined()
      expect(process.env.FROM_EXPAND).toEqual('my_expanded_value')
      expect(process.env.MY_ENV).toEqual('original')
    })
  })
})
