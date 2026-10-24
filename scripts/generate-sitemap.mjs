import fs from 'node:fs';
import { INDUSTRIES } from '../src/data/industries.ts';

// Simple sitemap generator for static marketing routes + 78 sector routes.
const base = process.env.VITE_SITE_URL || 'http://localhost:5173';
const staticRoutes = [
  '/',
  '/product',
  '/product/inventory',
  '/product/pos',
  '/product/purchasing',
  '/product/stock-control',
  '/product/reports',
  '/product/siborg',
  '/solutions/retail',
  '/solutions/wholesale',
  '/solutions/distribution',
  '/solutions/manufacturing',
  '/industries',
  '/pricing',
  '/setup',
  '/integrations',
  '/switch-to-sikick',
  '/resources',
  '/about',
  '/contact',
  '/security',
  '/request-quote',
];

const urls = [...staticRoutes, ...INDUSTRIES.map((industry) => `/industries/${industry.slug}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((url) => `  <url><loc>${base}${url}</loc></url>`)
  .join('\n')}\n</urlset>\n`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`Wrote sitemap with ${urls.length} urls.`);
