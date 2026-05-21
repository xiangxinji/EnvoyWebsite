// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  output: 'static',
  site: 'https://xiangxinji.github.io',
  base: '/EnvoyWebsite/',
  integrations: [
    starlight({
      title: 'Envoy Docs',
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
        en: {
          label: 'English',
          lang: 'en',
        },
      },
      sidebar: [
        { slug: 'getting-started' },
        { slug: 'chat' },
        { slug: 'tasks' },
        { slug: 'ai' },
        { slug: 'deployment' },
      ],
      customCss: ['./src/styles/starlight.css'],
    }),
  ],
});
