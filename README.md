<div align="center">
  <img src="https://raw.githubusercontent.com/utrolig/tiel/main/assets/banner.png" width=400 alt="tiel logo" />
</div>
<br />
<div align="center">

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/@stibstack/tiel)](https://www.npmjs.com/package/@stibstack/tiel)
[![NPM Downloads](https://img.shields.io/npm/dm/@stibstack/tiel)](https://www.npmjs.com/package/@stibstack/tiel)
[![License](https://img.shields.io/github/license/utrolig/tiel)](https://github.com/utrolig/tiel/blob/main/LICENSE)

A simple logger for the browser, wrapping `console` and adding scopes, colors and emojis.

</div>

<div align="left">

### Installing

Install `@stibstack/tiel` with your preferred package manager.

```sh
npm install @stibstack/tiel
```

import `createLogger` and call it to create a logger instance.
Names are formatted as `logger:scope`. This allows for finegrained enabling of logging the pieces you need to see in the console.

```ts
import { createLogger } from "@stibstack/tiel";

localStorage.setItem("DEBUG", "app:posts");
const postsLogger = createLogger("app:posts");

postsLogger.log("Hello from posts!");
// output: <app:posts> Hello from posts!

const serviceLogger = createLogger("app:bookmarks");
serviceLogger.log("Hello from bookmarks!");
// this will not output anything since there is no matching scope.
```

### Log levels

The default `LogLevel` is `log`. You can set a higher or lower loglevel by using `localStorage.setItem("LOG_LEVEL", "DEBUG")`

```ts
"TRACE" | "DEBUG" | "INFO" | "LOG" | "WARN" | "ERROR";
```

### Logger options

```ts
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
```

</div>
