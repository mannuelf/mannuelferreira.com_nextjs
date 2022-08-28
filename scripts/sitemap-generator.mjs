/**
 * Sitemap generator
 * source: https://blog.logrocket.com/build-sitemap-generator-nextjs
 * */

import fs from 'fs';
import { globby } from 'globby';

function addPage(page) {
  const path = page
    .replace('pages', '')
    .replace('.tsx', '')
    .replace('.mdx', '');
  const route = path === 'index' ? '' : path;
  console.log('>>>ADDPAGE FN>>>>>>>>>>>>>>', path, route);
  return `<url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
}

const generateSitemap = async () => {
  console.log('>>>> GENERATESITEMAP >>>>>>>>>>>>>');
  const pages = await globby([
    'pages/**/*{.tsx,.mdx}',
    '!pages/_*.js',
    '!pages/api',
  ]);
  console.log('[][][][][][][][][', pages);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${pages.map(addPage).join('\n')}
       </urlset>`;
  fs.writeFileSync('public/sitemap.xml', sitemap);
};

export default generateSitemap;
