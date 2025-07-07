import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeImgLazy from './src/utils/rehype-img-lazy.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://moiseshernandez.net/',
  integrations: [svelte()],
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
      rehypeImgLazy,
    ],
  },
})
