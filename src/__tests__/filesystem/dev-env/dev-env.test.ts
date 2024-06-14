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
  })
})
