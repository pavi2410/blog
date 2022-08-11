import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.pavi2410.me',
  integrations: [preact(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
    }
  }
});