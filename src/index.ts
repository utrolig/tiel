import { defaultColorList, defaultEmojiList } from "./colors";
import { LogLevels, type LogLevelName, LogLevelNames } from "./levels";
import { noop, noopLogger } from "./noop";
import type {
  CreateLoggerOptions,
  LoggerColor,
  LoggerName,
  TielInstance,
} from "./types";
import { getScope, isLoggerEnabled } from "./util";

let _loggerCount = -1;

const getEmoji = (emoji?: boolean | string): string => {
  if (typeof emoji === "string") {
    return emoji;
  }

  if (emoji) {
    const emoji = defaultEmojiList[
      _loggerCount % defaultEmojiList.length
    ] as string;
    return emoji;
  }

  return "";
};

const getColor = (color?: LoggerColor | boolean): LoggerColor | undefined => {
  if (color === false) {
    return undefined;
  }

  if (color && typeof color === "object") {
    return color;
  }

  return defaultColorList[
    _loggerCount % defaultColorList.length
  ] as LoggerColor;
};

const _createLogger = (
  name: LoggerName,
  options: CreateLoggerOptions
): TielInstance => {
  const emoji = getEmoji(options.emoji);
  const color = getColor(options.color);

  const colorPrefix = color ? `%c` : "";
  const prefixedScope = `${colorPrefix}${emoji} <${name}> `;
  const styles = color
    ? `background-color: ${color.backgroundColor}; color: ${color.color}; font-weight: bold; padding: 2px; border-radius: 4px; display: inline-flex; align-items: center;`
    : "";

  const logger = {} as TielInstance;

  const methods: Lowercase<LogLevelName>[] = [
    "trace",
    "debug",
    "info",
    "log",
    "warn",
    "error",
  ];

  const storage = options.storage ?? localStorage;
  const storageLevel =
    (storage.getItem("LOG_LEVEL")?.toUpperCase() as LogLevelName) ?? "";
  const levelName = LogLevelNames.includes(storageLevel) ? storageLevel : "LOG";
  const level = LogLevels[levelName];

  methods.forEach((method) => {
    const isLevelEnabled =
      LogLevels[method.toUpperCase() as LogLevelName] >= level;

    const fn = isLevelEnabled
      ? console[method].bind(console, prefixedScope, styles)
      : noop;

    logger[method] = fn;
  });

  return logger;
};

/**
 *
 * @param name Logger name in the format of `logger:scope`
 * @param options Additional options for the logger, see `CreateLoggerOptions`
 */
export const createLogger = (
  name: LoggerName,
  options: CreateLoggerOptions = {}
): TielInstance => {
  const enabled = isLoggerEnabled(name, options.storage ?? localStorage);

  if (!enabled) {
    return noopLogger;
  }

  const { logger, scope } = getScope(name);
  const loggerName = `${logger}:${scope}` as LoggerName;

  _loggerCount += 1;

  return _createLogger(loggerName, options);
};
