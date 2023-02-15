import dotEnv from 'dotenv'
import fs from 'node:fs'
import { expand } from 'dotenv-expand'
import path from 'node:path'

/**
 * Setup environment variables from .env files based on NODE_ENV
 * @param rootPath - root path for the env files
 * @param debug - dotEnv debug flag
 */
export function setupEnv(rootPath: string, debug = false): string[] {
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
    const fullPath = path.normalize(`${rootPath}/${file}`)

    if (fs.existsSync(fullPath)) {
      loaded.push(file)

      dotEnv.config({
        path: fullPath,
        override: false,
        debug
      })
    }
  }

  // @ts-expect-error - process.env string index signature
  expand({ ignoreProcessEnv: true, parsed: process.env })

  return loaded
}
