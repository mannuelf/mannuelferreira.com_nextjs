/**
 * Sitemap generator
 * source: https://blog.logrocket.com/build-sitemap-generator-nextjs
 * */

import fs from 'fs';
import { globby } from 'globby';

const addPage = (page) => {
  const path = page
    .replace('pages', '')
    .replace('.tsx', '')
    .replace('.mdx', '');
  const route = path === 'index' ? '' : path;

  return `<url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
};

const generateSitemap = async () => {
  try {
    const pages = await globby([
      'pages/**/*{.tsx,.mdx}',
      '!pages/_*.js',
      '!pages/api',
    ]);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${pages.map(addPage).join('\n')}
       </urlset>`;
    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.info('Sitemap has successfully generated');
  } catch (e) {
    console.warn('Sitemap generation failed:', e);
  }
};

export default generateSitemap;
