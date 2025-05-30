import { css } from 'hono/css';
import { FC } from 'hono/jsx';

const HeaderStyles = css`
  height: var(--header-height);
  background-color: #fff;
`;

export const Header: FC = ({ children }) => {
  return <header class={HeaderStyles}>{children}</header>;
};
