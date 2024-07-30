import axios from 'axios';
import { DataSet } from '../../../app/models/DataSet';
import { ViewType } from '../../../app/models/ViewType';
import { fireEvent, render, screen, waitFor } from '../../../test-utils';

import { Page } from './Page';

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

test('renders basic elements of Page component', () => {
  render(<Page />);

  // Test MainNav component rendering
  const titleElement = screen.getByText(/panacée/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders lazy page components for ViewType.TABLE', async () => {
  mockViewType = ViewType.TABLE;

  render(<Page />);

  // Test Table component rendering
  const tableElement = await screen.findByTestId('table-view-element');
  expect(tableElement).toBeInTheDocument();
});

test('renders lazy page components for ViewType.MAP', async () => {
  mockViewType = ViewType.MAP;

  render(<Page />);

  // Test Table component rendering
  const mapElement = await screen.findByTestId('map-element');
  expect(mapElement).toBeInTheDocument();
});
