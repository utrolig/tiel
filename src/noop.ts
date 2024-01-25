import type { TielInstance } from "./types";

export const noop = () => {};

export const noopLogger: TielInstance = {
  debug: noop,
  log: noop,
  info: noop,
  warn: noop,
  error: noop,
  trace: noop,
};
