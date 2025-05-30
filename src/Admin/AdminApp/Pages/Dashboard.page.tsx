import { useEffect } from 'hono/jsx';
import { useDevice } from '../hooks/useDevice';

export const DashboardPage = () => {
  const device = useDevice();
  useEffect(() => {
    console.log(device);
  }, [device]);
  return <h1>DASHBOARD</h1>;
};
