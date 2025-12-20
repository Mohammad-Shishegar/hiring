declare module "tailwindcss/resolveConfig" {
  import type { Config } from "tailwindcss";

  function resolveConfig(config: Config): Config;
  export = resolveConfig;
}
