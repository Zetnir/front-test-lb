import * as React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Virus1Icon } from '../../assets/virus.svg';
import { ReactComponent as Virus2Icon } from '../../assets/virus-2.svg';

export type MainNavLinkProps = React.ParamHTMLAttributes<HTMLDivElement> & {
  href: string;
  selected?: boolean;
};

export const MainNavLink: React.FC<MainNavLinkProps> = ({
  href,
  selected,
  className,
  children,
  role = 'link',
  ...props
}) => (
  <NavLink to={href}>
    <div
      role={role}
      className={classnames(
        className,
        'flex space-x-2 items-center font-bold text-lg transition-colors pl-20',
        {
          'text-gray-300 hover:text-red-600': !selected,
          'pointer-events-none text-gray-700': selected,
        }
      )}
      {...props}
    >
      {selected ? <Virus1Icon /> : <Virus2Icon />}
      <span>{children}</span>
    </div>
  </NavLink>
);
