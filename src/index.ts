import dotEnv from 'dotenv'
import fs from 'node:fs'
// https://github.com/vercel/next.js/blob/canary/packages/next-env/index.ts

// https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order

export function initializeEnv(rootPath: string, debug = false): string[] {
  const resolvedEnv = (process.env.NODE_ENV || '').toLowerCase()
  let files = [
    `.env.${resolvedEnv}.local`,
    `.env.local`,
    `.env.${resolvedEnv}`,
    '.env'
  ]

  if (resolvedEnv === 'test') {
    files = files.filter((file) => !file.includes('.local'))
  }

  const loaded = []

  for (const file of files) {
    const path = `${rootPath}/${file}`
    loaded.push(file)
    if (fs.existsSync(path)) {
      dotEnv.config({
        path,
        override: false,
        debug
      })
    }
  }

  return loaded
}
