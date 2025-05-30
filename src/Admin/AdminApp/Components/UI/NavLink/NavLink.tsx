import { css, cx } from 'hono/css';
import { PropsWithChildren, useContext } from 'hono/jsx';
import { useFastContextFields } from '../../../Router/useRouter';
import { theme } from '../../../theme';
import { Icon } from '../../../types';

const navLinkStyling = css`
  background-color: var(--white);
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--spacing-xs);
  font-size: medium;
  cursor: pointer;
  transition: all 0.2s;
  text-align: start;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  &:hover {
    background-color: var(--primary-color-light);
  }
`;

const activeStyle = css`
  background-color: var(--primary-color-light);
  color: var(--primary-color);
`;

interface NavLinkProps {
  leftIcon?: Icon;
  to: string;
}

export const NavLink = ({ children, leftIcon, to }: PropsWithChildren<NavLinkProps>) => {
  const fields = useFastContextFields(['path']);

  const handleOnNavigate = (e: MouseEvent) => {
    e.preventDefault();

    const pathWithoutTrailingSlash = to === '/' ? '' : to;

    history.pushState({}, '', `/admin${pathWithoutTrailingSlash}`);
    const navEvent = new PopStateEvent('popstate');
    dispatchEvent(navEvent);
  };

  const pathWithTrailingSlash = fields.path.get === '' ? '/' : fields.path.get;

  const active = () => {
    return to === pathWithTrailingSlash ? activeStyle : undefined;
  };

  const determineIconColor = () => {
    return to === pathWithTrailingSlash ? theme.colors.primaryColor : undefined;
  };

  return (
    <a onClick={handleOnNavigate} class={cx(navLinkStyling, active())}>
      {leftIcon ? leftIcon({ color: determineIconColor() }) : null}
      {children}
    </a>
  );
};
