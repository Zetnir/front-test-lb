import * as React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export type ViewSwitchItemProps = React.ParamHTMLAttributes<HTMLDivElement> & {
  href: string;
  selected?: boolean;
};

export const ViewSwitchItem: React.FC<ViewSwitchItemProps> = ({
  href,
  selected,
  className,
  children,
  role = 'link',
  ...props
}) => {
  if (selected) {
    return (
      <div
        role={role}
        data-testid='view-switch-selected-item-element'
        className={classnames(
          className,
          'py-3 px-5 text-gray-700 select-none transition-colors pointer-events-none'
        )}
        {...props}
      >
        <span>• </span>
        {children}
      </div>
    );
  }

  return (
    <NavLink to={href}>
      <div
        data-testid='view-switch-item-element'
        role={role}
        className={classnames(
          className,
          'py-3 px-5 text-gray-400 hover:text-red-600 select-none transition-colors'
        )}
        {...props}
      >
        <span className='invisible'>• </span>
        {children}
      </div>
    </NavLink>
  );
};
