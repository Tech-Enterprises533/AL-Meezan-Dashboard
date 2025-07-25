import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/clients': 'http://localhost:5000',
      '/vat': 'http://localhost:5000',
      '/dereg': 'http://localhost:5000',
      '/refund': 'http://localhost:5000',
      '/documents': 'http://localhost:5000',
      '/sendEmail': 'http://localhost:5000',
      '/kyc': 'http://localhost:5000',
    },
  },
  preview: {
    port: 5000,
  },
  base: '/almeezan',
});
