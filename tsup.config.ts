import { defineConfig } from "tsup";

export default defineConfig({
  target: "esnext",
  platform: "browser",
  format: "esm",
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  outDir: "dist/",
  treeshake: { preset: "smallest" },
  replaceNodeEnv: true,
});
