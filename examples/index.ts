import { createLogger } from "../src";

localStorage.clear();
localStorage.setItem("DEBUG", "*");

const appControllerLogger = createLogger("app:controller", {
  emoji: false,
});

const appServiceLogger = createLogger("app:service", {
  color: false,
});

const simpleLogger = createLogger("app:simple", {
  color: false,
  emoji: false,
});

const defaultLogger = createLogger("app:default");
const customLogger = createLogger("app:custom", {
  color: { backgroundColor: "red", color: "white" },
  emoji: "🔥",
});

appServiceLogger.log("With colors disabled");
appControllerLogger.log("With prefix disabled");
simpleLogger.log("With everything disabled");

defaultLogger.log("With nice colors");
defaultLogger.log("And emojis!");

customLogger.log("With custom colors");
customLogger.log("And custom emoji");
