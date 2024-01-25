import { createLogger } from "../src";

// localStorage.setItem("DEBUG", "app:controller");

// testScopeLogger = createLogger("test:scope");
// appControllerLogger = createLogger("app:controller");
// appServiceLogger = createLogger("app:service");

// appControllerLogger.log("Fetching data...");
// testScopeLogger.log("Fetching data...");
// appServiceLogger.log("Fetching data...");

localStorage.clear();
localStorage.setItem("DEBUG", "app:controller,app:default");

let appControllerLogger = createLogger("app:controller", {
  emojiPrefix: false,
});
let appServiceLogger = createLogger("app:service", {
  colors: false,
});

appServiceLogger.log("With colors disabled");
appControllerLogger.log("With prefix disabled");
