import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` → build biasa untuk hosting (Firebase Hosting, Vercel, Netlify).
// `npm run build:single` → satu file HTML untuk demo offline.
export default defineConfig(({ mode }) => ({
  plugins: mode === 'single' ? [react(), viteSingleFile()] : [react()],
  base: './',
  build: { chunkSizeWarningLimit: 900 },
}));
