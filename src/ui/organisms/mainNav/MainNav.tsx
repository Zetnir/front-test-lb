import * as React from 'react';
import { useParams } from 'react-router-dom';

import { DataSet } from '../../../app/models/DataSet';
import { RouteParams } from '../../../app/models/RouteParams';
import { TranslateDataSet } from '../../../app/services/TranslateDataSet';
import { PageTitle } from '../../atoms/pageTitle/PageTitle';
import { MainNavLink } from '../../atoms/navLink/MainNavLink';

export const MainNav: React.FC = () => {
  const { viewType, dataSet, date } = useParams<RouteParams>();

  return (
    <div className='bg-white'>
      <div className='w-max space-y-16'>
        <PageTitle />
        <MainNavLink
          className='pt-14'
          href={`/${DataSet.NewCases}/${viewType}/${date}`}
          selected={dataSet === DataSet.NewCases}
        >
          {TranslateDataSet(DataSet.NewCases)}
        </MainNavLink>
        <MainNavLink
          href={`/${DataSet.Deaths}/${viewType}/${date}`}
          selected={dataSet === DataSet.Deaths}
        >
          {TranslateDataSet(DataSet.Deaths)}
        </MainNavLink>
      </div>
    </div>
  );
};
