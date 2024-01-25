import type { LoggerName, LoggerWithScope, LoggerStorage } from "./types";

export const getScope = (loggerName: LoggerName): LoggerWithScope => {
  const [_logger, _scope] = loggerName.split(":");

  const logger = _logger?.trim() ?? "";
  const scope = _scope?.trim() ?? "";

  return { logger, scope };
};

export const isLoggerEnabled = (name: LoggerName, storage: LoggerStorage) => {
  const debug = storage.getItem("DEBUG");
  const debugScopes = debug?.split(",") ?? [];
  const { logger, scope } = getScope(name);

  if (!logger || !scope) {
    return false;
  }

  if (debug === "*") {
    return true;
  }

  // We only get here if there's no wildcard in the debug scopes so the assertion is safe.
  const validDebugScopes = (debugScopes as LoggerName[])
    .map(getScope)
    .filter(Boolean) as LoggerWithScope[];

  return validDebugScopes.some(
    ({ logger: _debugLogger, scope: _debugScope }) => {
      const matchesLogger = _debugLogger === logger;
      const matchesScope =
        matchesLogger && (_debugScope === scope || _debugScope === "*");

      return matchesLogger && matchesScope;
    }
  );
};
