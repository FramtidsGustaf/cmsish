import { css } from 'hono/css';
import { FC, useState } from 'hono/jsx';
import { Sidebar, SidebarFillMaterial } from './Sidebar';
import { Header } from './Header';
import { Button } from '../UI/Button/Button';

const FlexContainer = css`
  width: 100svw;
  display: flex;
`;

const ContentContainer = css`
  width: 100%;
  flex-grow: 0;
  min-height: 100svh;
  background-color: #eff2f4;
`;

export const AppContainer: FC = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} />
      <div class={FlexContainer}>
        <SidebarFillMaterial isOpen={isSidebarOpen} />
        <div class={ContentContainer}>
          <Header>
            <Button
              onClick={() => {
                setIsSidebarOpen((prev) => !prev);
              }}
            >
              X
            </Button>
          </Header>
          {children}
        </div>
      </div>
    </>
  );
};
