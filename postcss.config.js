import tailwindConfig from './src/css/tailwind.config.js';

import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};
