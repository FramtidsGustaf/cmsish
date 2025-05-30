import { css, cx } from 'hono/css';
import { DashboardIcon, GhostIcon, PageIcon, PostIcon, UsersIcon, LogoutIcon } from '../../Icons';
import { NavLink } from '../UI/NavLink/NavLink';
import { Button } from '../UI/Button/Button';
import { FC } from 'hono/jsx';
import { theme } from '../../theme';

const SidebarStyle = css`
  background-color: white;
  width: var(--sidebar-width);
  height: 100svh;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: calc(0px - var(--sidebar-width));
  padding: var(--spacing-lg) var(--spacing-md);
  box-shadow: 0px 3.57px 40.21px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
`;

const SidebarOpen = css`
  left: 0px;
  @media (max-width: ${theme.breakPoints.mobile.max}) {
    width: 100svw;
  }
`;

const TitleStyle = css`
  font-size: 18px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const NavLinksStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const Flex = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ButtonStyle = css`
  background-color: var(--text-color);
  color: var(--white);
`;

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  const pages = [
    { name: 'Dashboard', icon: DashboardIcon, to: '/' },
    { name: 'Pages', icon: PageIcon, to: '/pages' },
    { name: 'Posts', icon: PostIcon, to: '/posts' },
    { name: 'Users', icon: UsersIcon, to: '/users' },
  ];

  const determineSidebarStyle = () => {
    if (isOpen) return cx(SidebarStyle, SidebarOpen);

    return SidebarStyle;
  };

  return (
    <div class={determineSidebarStyle()}>
      <div class={TitleStyle}>
        <GhostIcon />
        <h2>Hejsan</h2>
      </div>

      <div class={Flex}>
        <div class={NavLinksStyle}>
          {pages.map((page) => (
            <NavLink key={page.name} to={page.to} leftIcon={page.icon}>
              {page.name}
            </NavLink>
          ))}
        </div>
      </div>
      <Button className={ButtonStyle} leftIcon={LogoutIcon}>
        Log Out
      </Button>
    </div>
  );
};

const FillMaterialStyle = css`
  width: 0px;
  min-height: 100svh;
  transition: all 0.2s;
`;

const FillMaterialStyleOpen = css`
  width: var(--sidebar-width);
  flex-shrink: 0;

  @media (max-width: ${theme.breakPoints.mobile.max}) {
    flex-shrink: 1;
    width: 100svw;
  }
`;

interface SidebarFillMaterialProps {
  isOpen: boolean;
}

export const SidebarFillMaterial: FC<SidebarFillMaterialProps> = ({ isOpen }) => {
  const determineSidebarStyle = () => {
    if (isOpen) return cx(FillMaterialStyle, FillMaterialStyleOpen);
    return FillMaterialStyle;
  };
  return <div class={determineSidebarStyle()} />;
};
