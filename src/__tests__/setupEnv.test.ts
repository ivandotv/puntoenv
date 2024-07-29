import fs from "node:fs"
import dotEnv from "dotenv"
import { beforeEach, describe, expect, test, vitest } from "vitest"
import { setupEnv } from "../index"
import { clearTestEnvVars } from "./utils"

vitest.mock("node:fs")
vitest.mock("dotenv")

describe("Env", () => {
  beforeEach(clearTestEnvVars)

  test('node_env="development"', () => {
    process.env.NODE_ENV = "DEVELOPMENT"

    const path = "/path/to/project/"

    fs.existsSync = vitest.fn().mockReturnValue(true)

    const loaded = setupEnv(path)

    expect(loaded).toEqual([
      ".env.development.local",
      ".env.local",
      ".env.development",
      ".env",
    ])
    expect(dotEnv.config).toHaveBeenCalledTimes(4)
    expect(dotEnv.config).toHaveBeenNthCalledWith(1, {
      path: `${path}.env.development.local`,
      override: false,
      debug: false,
    })
    expect(dotEnv.config).toHaveBeenNthCalledWith(2, {
      path: `${path}.env.local`,
      override: false,
      debug: false,
    })
    expect(dotEnv.config).toHaveBeenNthCalledWith(3, {
      path: `${path}.env.development`,
      override: false,
      debug: false,
    })
    expect(dotEnv.config).toHaveBeenNthCalledWith(4, {
      path: `${path}.env`,
      override: false,
      debug: false,
    })
  })

  test("node_env=production", () => {
    process.env.NODE_ENV = "PRODUCTION"

    const path = "/path/to/project/"

    fs.existsSync = vitest.fn().mockReturnValue(true)

    const loaded = setupEnv(path)

    expect(loaded).toEqual([
      ".env.production.local",
      ".env.local",
      ".env.production",
      ".env",
    ])
    expect(dotEnv.config).toHaveBeenCalledTimes(4)
    expect(dotEnv.config).toHaveBeenNthCalledWith(1, {
      path: `${path}.env.production.local`,
      override: false,
      debug: false,
    })
    expect(dotEnv.config).toHaveBeenNthCalledWith(2, {
      path: `${path}.env.local`,
      override: false,
      debug: false,
    })
    expect(dotEnv.config).toHaveBeenNthCalledWith(3, {
      path: `${path}.env.production`,
      override: false,
      debug: false,
    })
    expect(dotEnv.config).toHaveBeenNthCalledWith(4, {
      path: `${path}.env`,
      override: false,
      debug: false,
    })
  })

  test('do not load ".local" files in test environment', () => {
    process.env.NODE_ENV = "TEST"
    const path = "/path/to/project/"

    fs.existsSync = vitest.fn().mockReturnValue(true)

    const loaded = setupEnv(path)

    expect(loaded).toEqual([".env.test", ".env"])
    expect(dotEnv.config).toHaveBeenCalledTimes(2)
    expect(dotEnv.config).toHaveBeenNthCalledWith(1, {
      path: `${path}.env.test`,
      override: false,
      debug: false,
    })
    expect(dotEnv.config).toHaveBeenNthCalledWith(2, {
      path: `${path}.env`,
      override: false,
      debug: false,
    })
  })

  test("throw an error if env variable is not present", () => {
    expect(() =>
      setupEnv(__dirname, { envVar: "DOES_NOT_EXIST_IN_PROCESS_ENV" }),
    ).toThrow("Environment variable DOES_NOT_EXIST_IN_PROCESS_ENV is not set")
  })
})
