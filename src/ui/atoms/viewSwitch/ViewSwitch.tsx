import * as React from 'react';
import classnames from 'classnames';
import { useParams } from 'react-router-dom';

import { RouteParams } from '../../../app/models/RouteParams';
import { ViewType } from '../../../app/models/ViewType';
import { ViewSwitchItem } from './ViewSwitchItem';
import { ShowDate } from './ShowDate';

export type ViewSwitchProps = React.ParamHTMLAttributes<HTMLDivElement>;

export const ViewSwitch: React.FC<ViewSwitchProps> = ({
  className,
  children,
  ...props
}) => {
  const { dataSet, viewType, date } = useParams<RouteParams>();

  return (
    <div
      data-testid='view-switch-element'
      className={classnames(className, 'flex justify-between items-center')}
      {...props}
    >
      <ShowDate />
      <div className='flex justify-end items-center'>
        <ViewSwitchItem
          href={`/${dataSet}/${ViewType.MAP}/${date}`}
          selected={viewType === ViewType.MAP}
        >
          Carte
        </ViewSwitchItem>
        <ViewSwitchItem
          href={`/${dataSet}/${ViewType.TABLE}/${date}`}
          selected={viewType === ViewType.TABLE}
          className='border-l border-gray-300 pl-3'
        >
          Liste
        </ViewSwitchItem>
      </div>
    </div>
  );
};
