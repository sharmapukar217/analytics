import "dotenv/config";

import type { CodegenConfig } from "@graphql-codegen/cli";
import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  documents: "src/**/*.{ts,tsx,js,jsx}",
  schema: [
    {
      [process.env.NEXT_PUBLIC_ADMIN_API as string]: {
        headers: {
          Accept: "application/json",
        },
      },
    },
  ],

  extensions: {
    codegen: {
      overwrite: true,
      ignoreNoDocuments: true,

      generates: {
        "src/generated/": {
          preset: "client",
          presetConfig: {
            fragmentMasking: false,
          },
          // plugins: [
          //   "typescript",
          //   "typescript-operations",
          //   "typed-document-node",
          // ],
          config: {
            useTypeImports: true,
            defaultScalarType: "unknown",
          },
        },
      },
    } satisfies CodegenConfig,
  },
};

export default config;
