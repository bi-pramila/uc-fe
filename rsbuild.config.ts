// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

import tailwindConfig from './tailwind.config.js';

console.log('Tailwind config:', tailwindConfig);

export default defineConfig({
  output: { 
    sourceMap: true 
  },
  tools: {
    postcss: (_, { addPlugins }) => {
      addPlugins([tailwindcss(), autoprefixer()]);
    },
  },
  plugins: [
    pluginReact(),
    pluginSass({
      sassLoaderOptions: {},
    }),
  ],
  server: {
    port: 3000
  },
});


// LOG RSBUILD CONFIG
console.log('RSBUILD CONFIG APPLIED:', {
  postcssPlugins: 'tailwind + autoprefixer',
  tailwindConfigPath: './tailwind.config.cjs',
  serverPort: 3000,
});

console.log('Loaded Tailwind config:', JSON.stringify(tailwindConfig, null, 2));

