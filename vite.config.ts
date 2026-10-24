import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Standalone Sikick public website. No proxy to the IMS backend:
// the site links out to the deployed app via VITE_SIKICK_* URLs.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
    css: false,
  },
});
