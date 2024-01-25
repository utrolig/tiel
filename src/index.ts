import { defaultColorList } from "./colors";
import { LogLevels, type LogLevelName, LogLevelNames } from "./levels";
import { noop, noopLogger } from "./noop";
import type { CreateLoggerOptions, LoggerName, TielInstance } from "./types";
import { getScope, isLoggerEnabled } from "./util";

let _loggerCount = -1;

const _createLogger = (
  name: LoggerName,
  options: CreateLoggerOptions
): TielInstance => {
  const useEmojis = options.emojiPrefix !== false;
  const emojiPrefix = useEmojis
    ? defaultColorList[_loggerCount % defaultColorList.length]?.emoji
    : "";
  const colorList = options.colorList ?? defaultColorList;

  const useColors = options.colors !== false;

  const color = useColors
    ? colorList[_loggerCount % colorList.length]
    : undefined;

  const colorPrefix = useColors ? `%c` : "";
  const prefixedScope = `${colorPrefix}${emojiPrefix} <${name}> `;
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
