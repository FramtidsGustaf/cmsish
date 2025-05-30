import { FC, useEffect } from 'hono/jsx/dom';
import { JSX } from 'hono/jsx/jsx-runtime';
import { createFastContext } from '../createFastContext';
import { DashboardPage } from '../Pages/Dashboard.page';
import { PagesPage } from '../Pages/Pages.page';
import { PostsPage } from '../Pages/Posts.page';
import { UsersPage } from '../Pages/Users.page';

const getCurrentPath = () => {
  const pathWithAdmin = window.location.pathname;
  const pathWithoutAdmin = pathWithAdmin.replace('/admin', '');
  return pathWithoutAdmin;
};

type Pages = { path: string; component: () => JSX.Element }[];

interface RouterContextType {
  path: string;
  pages: Pages;
}

export const { FastContextProvider, useFastContextFields } = createFastContext<RouterContextType>({
  path: getCurrentPath() as string,
  pages: [
    { path: '/', component: DashboardPage },
    { path: '/pages', component: PagesPage },
    { path: '/posts', component: PostsPage },
    { path: '/users', component: UsersPage },
  ] as Pages,
});

export const useRouter = () => {
  const RouterProvider: FC = ({ children }) => {
    return <FastContextProvider>{children}</FastContextProvider>;
  };

  return { RouterProvider };
};

export const RouterOutlet: FC = () => {
  const fields = useFastContextFields(['path', 'pages']);

  useEffect(() => {
    const updatePath = () => {
      fields.path.set(getCurrentPath());
    };

    window.addEventListener('popstate', updatePath);

    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  const pathWithTrailingSlash = fields.path.get === '' ? '/' : fields.path.get;

  const component = (fields.pages.get as Pages).find(
    (page) => page.path === pathWithTrailingSlash,
  )?.component;

  return component ? component() : <>404</>;
};
