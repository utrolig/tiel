export type LoggerName = `${string}:${string}`;

export type DebugScope = `${string}:${string}` | "*";

export type LoggerWithScope = {
  logger: string;
  scope: string;
};

export type LoggerColor = {
  backgroundColor: string;
  color: string;
  emoji: string;
};

export type CreateLoggerOptions = {
  /**
   * Enable or disable background colors for logger scopes
   */
  colors?: boolean;

  /**
   * Custom background color list for logger scopes.
   * Colors are assigned in order of logger creation.
   *
   * If not provided, the default color list will be used.
   */
  colorList?: LoggerColor[];

  /**
   * Prefix logger scopes with a unique emoji for easier visual identification
   */
  emojiPrefix?: boolean;

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
