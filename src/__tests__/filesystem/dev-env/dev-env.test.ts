import { beforeEach, describe, expect, test } from "vitest"
import { setupEnv } from "../../../index"
import { clearTestEnvVars } from "../../utils"

describe("Dev Files", () => {
  beforeEach(clearTestEnvVars)

  test("env dev test", () => {
    process.env.NODE_ENV = "DEVELOPMENT"

    setupEnv(__dirname)

    expect(process.env.MY_ENV).toEqual(".env.development.local")
    expect(process.env.FROM_EXPAND).toEqual(".env.development.local")
  })

  test("do not override a variable that is present in the process.env", () => {
    process.env.NODE_ENV = "DEVELOPMENT"
    process.env.MY_ENV = "process.env"

    setupEnv(__dirname)

    expect(process.env.MY_ENV).toBe("process.env")
    expect(process.env.FROM_EXPAND).toBe(".env.development.local")
  })

  describe("Custom ENV var", () => {
    test("env dev test", () => {
      process.env.NODE_CONTEXT = "DEVELOPMENT"

      setupEnv(__dirname, { envVar: "NODE_CONTEXT" })

      expect(process.env.MY_ENV).toEqual(".env.development.local")
      expect(process.env.FROM_EXPAND).toEqual(".env.development.local")
    })

    test("onLoad callback", () => {
      process.env.NODE_CONTEXT = "DEVELOPMENT"
      const path = "/__tests__/filesystem/dev-env"

      const result: Record<string, unknown>[] = []
      setupEnv(__dirname, {
        envVar: "NODE_CONTEXT",
        onLoad: (data) => {
          result.push(data)
        },
      })

      expect(result[0]).toEqual({
        path: expect.stringContaining(path),
        filename: ".env.development.local",
        result: {
          parsed: {
            MY_ENV: ".env.development.local",
            TO_EXPAND: ".env.development.local",
            FROM_EXPAND: "$TO_EXPAND",
          },
        },
      })

      expect(result[1]).toEqual({
        path: expect.stringContaining(path),
        filename: ".env.local",
        result: {
          parsed: {
            MY_ENV: ".env.local",
            TO_EXPAND: ".env.local",
            FROM_EXPAND: "$TO_EXPAND",
          },
        },
      })

      expect(result[2]).toEqual({
        path: expect.stringContaining(path),
        filename: ".env.development",
        result: {
          parsed: {
            MY_ENV: ".env.development",
            TO_EXPAND: ".env.development",
            FROM_EXPAND: "$TO_EXPAND",
          },
        },
      })

      expect(result[3]).toEqual({
        path: expect.stringContaining(path),
        filename: ".env",
        result: {
          parsed: {
            MY_ENV: ".env",
            TO_EXPAND: ".env",
            FROM_EXPAND: "$TO_EXPAND",
          },
        },
      })
    })
  })
})
