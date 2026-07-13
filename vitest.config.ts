import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// Reuse the app's Vite plugins (React, Tailwind) and layer the test config on
// top. Kept separate from vite.config.ts so the app's tsc build does not pull
// in Vitest's bundled Vite types.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './vitest.setup.ts',
      // Resolve CSS Module class names to their unscoped names so snapshots
      // stay readable (mirrors the previous identity-obj-proxy behavior).
      css: { modules: { classNameStrategy: 'non-scoped' } },
    },
  }),
);
