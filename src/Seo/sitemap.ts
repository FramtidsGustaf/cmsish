import { Hono } from "hono";

const siteMapRoute = new Hono();

siteMapRoute.get('/', (c) => {
  // This should be a db query
  const pages = [
    {
      path: '/hejsan',
      updatedAt: new Date(Date.now()),
    },
  ];

  // Not sure how to do this. Perhaps with an environment variable
  const baseUrl = 'https://exempel.se';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(
    (page) => `
      <url>
        <loc>${baseUrl}${page.path}</loc>
        <lastmod>${page.updatedAt.toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      `
  )}
  </urlset>
  `;

  return c.text(xml, 200, {
    'Content-Type': 'application/xml',
  });
});

export { siteMapRoute };