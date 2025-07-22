import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 14'],
      dts: true,
    },
    {
      format: 'cjs',
      syntax: ['node 14'],
    },
  ],
  source: {
    entry: {
      cli: './src/cli.ts',
      index: './src/index.ts',
    },
  },
});
