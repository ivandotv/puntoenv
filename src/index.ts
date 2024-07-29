import fs from "node:fs"
import path from "node:path"
import dotEnv from "dotenv"
import { expand } from "dotenv-expand"

/**
 * Setup environment variables from .env files based on NODE_ENV
 * @param rootPath - root path for the .env files
 * @param debug - dotEnv debug flag
 * @returns list of loaded files
 */
export function setupEnv(
  rootPath: string,
  {
    envVar = "NODE_ENV",
    debug = false,
    onLoad,
  }: {
    envVar?: string
    debug?: boolean
    onLoad?: (data: {
      path: string
      filename: string
      result: {
        error?: Error
        parsed?: Record<string, string>
      }
    }) => void
  } = {},
): string[] {
  const resolvedEnv = (process.env[envVar] || "").toLowerCase()

  if (!resolvedEnv) {
    throw new Error(`Environment variable ${envVar} is not set`)
  }

  let files = [
    `.env.${resolvedEnv}.local`,
    ".env.local",
    `.env.${resolvedEnv}`,
    ".env",
  ]

  if (resolvedEnv === "test") {
    files = files.filter((file) => !file.includes(".local"))
  }

  const loaded = []
  for (const file of files) {
    const fullPath = path.normalize(`${rootPath}/${file}`)

    if (fs.existsSync(fullPath)) {
      loaded.push(file)

      const result = dotEnv.config({
        path: fullPath,
        override: false,
        debug,
      })

      if (onLoad) {
        onLoad({ path: rootPath, filename: file, result })
      }
    }
  }

  // @ts-expect-error - process.env string index signature
  expand({ ignoreProcessEnv: true, parsed: process.env })

  return loaded
}
