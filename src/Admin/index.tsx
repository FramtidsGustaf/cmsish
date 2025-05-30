//! Make sure to restart the server when doing stuff in this file

import { FSWatcher, watch } from 'fs';
import { spawn, spawnSync } from 'bun';
import { Hono } from 'hono';
import { createBunWebSocket } from 'hono/bun';
import { Style } from 'hono/css';
import { adminGlobalStyles } from './AdminApp/adminGlobalStyles';

const adminRoute = new Hono();

/**
 * The code below handle hot module reload for the Admin App
 * It:
 * - Opens a websocket
 * - Is watching the Admin directory for changes
 * - Builds the Adm
 */
const { upgradeWebSocket, websocket: adminWebsocket } = createBunWebSocket();

if (Bun.env.BUN_MODE === 'development') {
  let watcher: FSWatcher | null;

  adminRoute.get(
    '/ws',
    upgradeWebSocket(() => {
      return {
        onOpen(_, ws) {
          if (watcher) {
            watcher.close();
            watcher = null;
          }

          watcher = watch('./src/Admin', { recursive: true }, (event, fileName) => {
            console.log(`Detected ${event} in ${fileName} `);

            const result = spawnSync(['bun', 'admin.build.ts']);

            if (result.exitCode != 0) {
              console.error('Admin Build Failed');
              return false;
            }

            console.log('Build Finished');
            ws.send('reload-admin');
            return true;
          });
        },
      };
    }),
  );
}

adminRoute.get('/*', (c) => {
  return c.html(
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Style>{adminGlobalStyles}</Style>
      </head>
      <body>
        <div id="root"></div>
        <script src="/static/AdminApp.js" type="module"></script>
      </body>
    </html>,
  );
});

export { adminRoute, adminWebsocket };
