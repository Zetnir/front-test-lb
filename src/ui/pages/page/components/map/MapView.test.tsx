import axios from 'axios';
import React from 'react';
import { DataSet } from '../../../../../app/models/DataSet';
import { ViewType } from '../../../../../app/models/ViewType';
import { render, screen, waitFor } from '../../../../../test-utils';
import { PROVINCES_MAP_DATA } from '../../../../constants';
import { MapView } from './MapView';

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Empty mock
beforeEach(() => {
  mockedAxios.get.mockResolvedValue({
    data: {
      data: {
        cases: [],
        deaths: [],
      },
    },
  });

  jest.useFakeTimers();
});

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

test('renders lazy tableView component with additional content', async () => {
  render(
    <React.Suspense fallback={'Render test component...'}>
      <MapView />
    </React.Suspense>
  );

  const viewSwitchElement = await screen.findByTestId('view-switch-element');
  expect(viewSwitchElement).toBeInTheDocument();

  const CanadaElement = await screen.findByTestId('canada-element');
  expect(CanadaElement).toBeInTheDocument();

  // Additional elements
  for (const provinceData of PROVINCES_MAP_DATA) {
    const provinceElement = await screen.findByText(`${provinceData.code}`);
    expect(provinceElement).toBeInTheDocument();
  }
});
