export function clearTestEnvVars() {
  delete process.env.NODE_ENV
  delete process.env.NODE_CONTEXT
  delete process.env.MY_ENV
  delete process.env.FROM_EXPAND
}
