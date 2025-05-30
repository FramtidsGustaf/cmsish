import { Hono } from 'hono';
import { PublicWrapper } from './PublicWrapper';

const publicRoute = new Hono();

publicRoute.get('/', (c) => {
  const url = new URL(c.req.url);

  return c.render(
    <PublicWrapper title={url.pathname} description="Detta är en generisk beskrivning" lang="sv">
      <h1>{url.pathname}</h1>
    </PublicWrapper>,
  );
});

export { publicRoute };
