import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    testTimeout: 500,
    retry: 3,

    // avj is used in the server-side code, so we need to include it in the server-side dependencies
    server: {
      deps: {
        inline: ["ajv"],
      },
    },
    deps: {
      optimizer: {
        ssr: {
          include: ["ajv"],
        },
      },
    },

    // cloudflare workers pool options
    poolOptions: {
      workers: {
        wrangler: {
          configPath: "./wrangler.jsonc",
          // environment: "test",
        },
      },
    },
  },
});
