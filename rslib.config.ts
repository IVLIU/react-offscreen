import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      format: "esm",
      bundle: false,
      dts: true,
      output: {
        distPath: {
          root: "./dist/esm",
        },
      },
    },
    {
      format: "cjs",
      bundle: false,
      dts: true,
      output: {
        distPath: {
          root: "./dist/cjs",
        },
      },
    },
  ],
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: "automatic",
      },
    }),
  ],
});
