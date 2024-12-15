import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: 'src/index.ts', // CLI entry point
  output: {
    file: 'dist/index.js', // Output file
    format: 'esm',       // Use ES Module format
    // banner: '#!/usr/bin/env node', // Ensure the CLI remains executable
  },
  plugins: [typescript()],
  external: [
    // Mark dependencies as external to avoid bundling them
    'commander',
    'fs',
    'path',
    'url'
  ]
});
