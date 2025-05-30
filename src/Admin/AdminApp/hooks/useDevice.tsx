import { useEffect, useLayoutEffect, useState } from 'hono/jsx';

type Devices = 'desktop' | 'tablet' | 'mobile';

const breakpoints = {
  desktop: 'min-width: 1024px',
  tablet: 'min-width: 768px; max-width: 1023px',
  mobile: 'max-width: 767px',
};

const determineDevice = () => {
  const { innerWidth } = window;
  if (innerWidth < 768) return 'mobile';
  if (innerWidth > 1023) return 'desktop';
  return 'tablet';
};

export const useDevice = () => {
  const [device, setDevice] = useState<Devices>(determineDevice());

  useLayoutEffect(() => {
    const updateDevice = () => {
      setDevice(determineDevice());
    };

    window.addEventListener('resize', updateDevice);

    return () => window.removeEventListener('resize', updateDevice);
  });

  return device;
};
