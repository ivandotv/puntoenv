import { describe, expect, test } from "vitest"
import { setupEnv } from "../../../index"

describe("Dev Files", () => {
  test("env dev test", () => {
    process.env.NODE_ENV = "DEVELOPMENT"

    setupEnv(__dirname)

    expect(process.env.MY_ENV).toEqual(".env.development.local")
    expect(process.env.FROM_EXPAND).toEqual(".env.development.local")
  })

  describe("Custom ENV var", () => {
    test("env dev test", () => {
      process.env.NODE_CONTEXT = "DEVELOPMENT"

      setupEnv(__dirname, "NODE_CONTEXT")

      expect(process.env.MY_ENV).toEqual(".env.development.local")
      expect(process.env.FROM_EXPAND).toEqual(".env.development.local")
    })
  })
})
