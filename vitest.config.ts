import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Tell vitest to look for tests in the 'tests' directory
    include: ['tests/**/*.test.ts'],
  },
});
