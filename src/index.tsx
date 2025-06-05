import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';
import { jsxRenderer } from 'hono/jsx-renderer';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';

import { adminRoute, adminWebsocket } from './Admin';
import { publicRoute } from './Public';
import { robotRoute, siteMapRoute } from './Seo';
import { Style } from 'hono/css';
import { globalStyle } from './globalStyle';
import { adminApiRoute } from './Admin/api';

const app = new Hono();

// app.use(csrf());
app.use(secureHeaders());
app.use(logger());
app.use('/static/*', serveStatic({ root: './' }));

app.use('*', cors());

app.route('/robots.txt', robotRoute);
app.route('/sitemap.xml', siteMapRoute);
app.route('/admin', adminRoute);
app.route('/api', adminApiRoute);

app.use(
  '/*',
  jsxRenderer(({ children }) => {
    return (
      <html>
        <Style>{globalStyle}</Style>
        {children}
      </html>
    );
  }),
);
app.route('/*', publicRoute);

Bun.serve({
  port: 3000,
  fetch: app.fetch,
  websocket: Bun.env.BUN_MODE === 'development' ? adminWebsocket : undefined,
});
