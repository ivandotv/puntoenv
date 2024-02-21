import { setupEnv } from 'index'

describe('env: TEST', () => {
  test('do not load .local files', () => {
    process.env.NODE_ENV = 'TEST'

    const loaded = setupEnv(__dirname)

    expect(loaded).toEqual(['.env.test', '.env'])
    expect(process.env.MY_ENV).toEqual('.env.test')
    expect(process.env.FROM_EXPAND).toEqual('.env.test')
  })

  describe('Custom ENV var', () => {
    test('do not load .local files', () => {
      process.env.NODE_CONTEXT = 'TEST'

      const loaded = setupEnv(__dirname, 'NODE_CONTEXT')

      expect(loaded).toEqual(['.env.test', '.env'])
      expect(process.env.MY_ENV).toEqual('.env.test')
      expect(process.env.FROM_EXPAND).toEqual('.env.test')
    })
  })
})
