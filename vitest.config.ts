import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      exclude: ["src/types.ts", "examples", "node_modules", "dist"],
    },
  },
});
