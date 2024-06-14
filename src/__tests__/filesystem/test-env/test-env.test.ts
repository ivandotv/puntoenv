import { beforeEach, describe, expect, test } from "vitest"
import { setupEnv } from "../../../index"
import { clearTestEnvVars } from "../../utils"

describe("env: TEST", () => {
  beforeEach(clearTestEnvVars)

  test("do not load .local files", () => {
    process.env.NODE_ENV = "TEST"

    const loaded = setupEnv(__dirname)

    expect(loaded).toEqual([".env.test", ".env"])
    expect(process.env.MY_ENV).toEqual(".env.test")
    expect(process.env.FROM_EXPAND).toEqual(".env.test")
  })

  describe("Custom ENV var", () => {
    test("do not load .local files", () => {
      process.env.NODE_CONTEXT = "TEST"

      const loaded = setupEnv(__dirname, { envVar: "NODE_CONTEXT" })

      expect(loaded).toEqual([".env.test", ".env"])
      expect(process.env.MY_ENV).toEqual(".env.test")
      expect(process.env.FROM_EXPAND).toEqual(".env.test")
    })
  })
})
