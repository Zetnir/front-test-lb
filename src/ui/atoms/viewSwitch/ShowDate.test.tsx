import axios from 'axios';
import React from 'react';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';
import { DataSet } from '../../../app/models/DataSet';
import { ViewType } from '../../../app/models/ViewType';
import { dateState } from '../../../app/recoil/dateState';
import { DateFormatLong } from '../../../app/services/DateFormat';
import { fireEvent, render, screen } from '../../../test-utils';
import { ShowDate } from './ShowDate';
import { ViewSwitch } from './ViewSwitch';

// Mock params and setter
let mockViewType = ViewType.TABLE;
let mockDataSet = DataSet.NewCases;
let mockDate = '2021-08-01';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    viewType: mockViewType,
    dataSet: mockDataSet,
    date: mockDate,
  }),
  useRouteMatch: () => ({ url: `/${mockDataSet}/${mockViewType}/${mockDate}` }),
}));

test('renders ShowDate component', async () => {
  const initializeState = ({ set }: any) => {
    set(dateState, new Date('2021-08-01 '));
  };

  render(
    <RecoilRoot initializeState={initializeState}>
      <ShowDate />
    </RecoilRoot>
  );

  const dateStr = DateFormatLong(new Date('2021-08-01 '));
  const dateMatcher = new RegExp(dateStr);

  expect(screen.getByText(dateMatcher)).toBeInTheDocument();
  expect(screen.getByTestId('date-button')).toBeInTheDocument();
  expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('calendar-icon'));
  const xmarkedCalendarIcon = await screen.findByTestId('xmark-calendar-icon');
  expect(xmarkedCalendarIcon).toBeInTheDocument();
  expect(await screen.findByTestId('calendar-element')).toBeInTheDocument();
});
