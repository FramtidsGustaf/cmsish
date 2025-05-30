import { css, cx } from 'hono/css';
import { FC, PropsWithChildren } from 'hono/jsx';
import { Icon } from '../../../types';
import { theme } from '../../../theme';

const buttonStyling = css`
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--spacing-xs);
  font-size: medium;
  cursor: pointer;
  transition: all 0.2s;
  text-align: start;
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface ButtonProps {
  leftIcon?: Icon;
  className?: Promise<string>;
  onClick?: () => void;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  leftIcon,
  onClick,
}) => {
  return (
    <button class={cx(buttonStyling, className)} onClick={onClick}>
      {leftIcon ? leftIcon({ color: theme.colors.white }) : null}
      {children}
    </button>
  );
};
