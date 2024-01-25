export const LogLevels = {
  TRACE: 1,
  DEBUG: 2,
  INFO: 3,
  LOG: 4,
  WARN: 5,
  ERROR: 6,
} as const;

export const LogLevelNames = Object.keys(
  LogLevels
) as (keyof typeof LogLevels)[];

export type LogLevelName = keyof typeof LogLevels;
