export type LoggerName = `${string}:${string}`;

export type DebugScope = `${string}:${string}` | "*";

export type LoggerWithScope = {
  logger: string;
  scope: string;
};

export type LoggerColor = {
  backgroundColor: string;
  color: string;
};

export type CreateLoggerOptions = {
  /**
   * Customize or disable colors for logger
   */
  color?: LoggerColor | false;
  /**
   * Customize or disable emoji prefix for logger
   */
  emoji?: boolean | string;
  /**
   * Custom storage interface adhering to localStorage interface for overriding the default storage
   */
  storage?: LoggerStorage;
};

/* Custom storage interface adhering to localStorage interface for overriding the default storage */
export type LoggerStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

export type TielInstance = {
  debug: (...data: unknown[]) => void;
  error: (...data: unknown[]) => void;
  info: (...data: unknown[]) => void;
  log: (...data: unknown[]) => void;
  warn: (...data: unknown[]) => void;
  trace: (...data: unknown[]) => void;
};
