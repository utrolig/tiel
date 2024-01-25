import { describe, expect, it } from "vitest";
import { isLoggerEnabled } from "./util";
import type { LoggerStorage } from "./types";

const customStorageData = new Map<string, string | null>();
const customStorage: LoggerStorage & { clear: () => void } = {
  getItem: (key) => {
    return customStorageData.get(key) ?? null;
  },
  setItem: (key, value) => {
    customStorageData.set(key, value);
  },
  clear: () => {
    customStorageData.clear();
  },
};

describe("getScopes", () => {
  it("should return false if no value is set in storage", () => {
    localStorage.clear();
    customStorage.clear();

    expect(isLoggerEnabled("app:player", localStorage)).toBe(false);
    expect(isLoggerEnabled("app:player", customStorage)).toBe(false);
  });

  it("should decide if a scope is enabled or not based on storage", () => {
    localStorage.setItem("DEBUG", "app:player");
    customStorage.setItem("DEBUG", "app:player");
    expect(isLoggerEnabled("app:player", localStorage)).toBe(true);
    expect(isLoggerEnabled("app:player", customStorage)).toBe(true);

    localStorage.setItem("DEBUG", "app:*");
    customStorage.setItem("DEBUG", "app:*");
    expect(isLoggerEnabled("app:player", localStorage)).toBe(true);
    expect(isLoggerEnabled("app:player", customStorage)).toBe(true);

    localStorage.setItem("DEBUG", "app:controller");
    customStorage.setItem("DEBUG", "app:controller");
    expect(isLoggerEnabled("app:player", localStorage)).toBe(false);
    expect(isLoggerEnabled("app:player", customStorage)).toBe(false);

    localStorage.setItem("DEBUG", "app:controller");
    customStorage.setItem("DEBUG", "app:controller");
    expect(isLoggerEnabled("app:player", localStorage)).toBe(false);
    expect(isLoggerEnabled("app:player", customStorage)).toBe(false);
  });

  it("should return true if we provide a wildcard in storage", () => {
    localStorage.setItem("DEBUG", "*");
    customStorage.setItem("DEBUG", "*");
    expect(isLoggerEnabled("app:player", localStorage)).toBe(true);
    expect(isLoggerEnabled("app:player", customStorage)).toBe(true);
  });

  it("should return false if we provide an invalid scope", () => {
    localStorage.setItem("DEBUG", ":kekw:*");
    customStorage.setItem("DEBUG", ":kekw:*");
    expect(isLoggerEnabled(":kekw:", localStorage)).toBe(false);
    expect(isLoggerEnabled(":kekw:", customStorage)).toBe(false);

    localStorage.setItem("DEBUG", "*");
    customStorage.setItem("DEBUG", "*");
    expect(isLoggerEnabled(":kekw:", localStorage)).toBe(false);
    expect(isLoggerEnabled(":kekw:", customStorage)).toBe(false);
  });
});
