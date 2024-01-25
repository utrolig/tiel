import { createLogger } from "./";
import { describe, it, expect, vi } from "vitest";

describe("createLogger", () => {
  it("should return a logger", () => {
    const logger = createLogger("test:scope");
    expect(logger).toBeDefined();
  });

  it("should return a logger with the correct scope", () => {
    localStorage.setItem("DEBUG", "test:scope");
    const logger = createLogger("test:scope");
    logger.info("test");
    expect(logger).toBeDefined();
  });
});
