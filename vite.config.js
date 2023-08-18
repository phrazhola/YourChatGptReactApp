import react from '@vitejs/plugin-react';

import postcss from './postcss.config.js';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, '');
        },
      },
      {
        find: '@',
        replacement: (val) => {
          return val.replace('@', __dirname + '/src/vendors/chatbot-ui');
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
