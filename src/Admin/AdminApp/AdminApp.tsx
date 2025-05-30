import { type FC } from 'hono/jsx';
import { render } from 'hono/jsx/dom';

import { AppContainer } from './Components/AppContainer/AppContainer';
import { useRouter, RouterOutlet } from './Router/useRouter';

export const AdminApp: FC = () => {
  const { RouterProvider } = useRouter();

  return (
    <>
      <RouterProvider>
        <AppContainer>
          <RouterOutlet />
        </AppContainer>
      </RouterProvider>
    </>
  );
};

if (typeof window !== 'undefined') {
  const webSocket = new WebSocket('ws://localhost:3000/admin/ws');

  webSocket.onmessage = (e) => {
    if (e.data === 'reload-admin') {
      location.reload();
    }
  };
  const root = document.getElementById('root');
  if (root) render(<AdminApp />, root);
}
