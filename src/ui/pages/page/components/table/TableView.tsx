import * as React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { DataSet } from '../../../../../app/models/DataSet';
import { RouteParams } from '../../../../../app/models/RouteParams';
import { ViewType } from '../../../../../app/models/ViewType';
import { dateState } from '../../../../../app/recoil/dateState';
import { DateFormatShort } from '../../../../../app/services/DateFormat';
import { HrefFactory } from '../../../../../app/services/HrefFactory';
import { ViewSwitch } from '../../../../atoms/viewSwitch/ViewSwitch';
import { Table } from './Table';

export const TableView: React.FC = () => {
  const dateValue = useRecoilValue(dateState);
  const { dataSet, viewType, date } = useParams<RouteParams>();

  if (!dataSet) {
    return (
      <Redirect
        to={HrefFactory(
          DataSet.NewCases,
          viewType ?? ViewType.TABLE,
          date ?? DateFormatShort(dateValue ?? new Date())
        )}
      />
    );
  }

  if (!date) {
    return (
      <Redirect
        to={HrefFactory(
          dataSet,
          viewType ?? ViewType.TABLE,
          DateFormatShort(dateValue ?? new Date())
        )}
      />
    );
  }

  return (
    <div className='h-full' data-testid='table-view-element'>
      <ViewSwitch />
      <div
        className='grid justify-center pt-10'
        style={{ height: 'calc(100% - 2rem)' }}
      >
        <Table />
      </div>
    </div>
  );
};
