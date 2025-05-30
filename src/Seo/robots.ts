import { Hono } from "hono";

const robotRoute = new Hono();

robotRoute.get('/', (c) => {
  // same as sitemap
  const baseUrl = "https://exempel.se";
  return c.text(`User-agent: *
Disallow: /admin
Disallow: /login
Allow: /
    
SiteMap: ${baseUrl}/sitemap.xml`);
});

export { robotRoute };