import axios from 'axios';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { listenerCount } from 'stream';
import { DataSet } from '../../../../../app/models/DataSet';
import { fireEvent, render, screen } from '../../../../../test-utils';
import { Table } from './Table';

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock params and setter
let mockDataSet = DataSet.NewCases;
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    dataSet: mockDataSet,
  }),
  useRouteMatch: () => ({ url: `/${mockDataSet}/tableau` }),
}));

const mockedData = {
  data: {
    data: {
      cases: [
        {
          date: '2021-09-03',
          name: 'cases',
          region: 'AB',
          value: 1,
          value_daily: 4,
        },
        {
          date: '2021-09-03',
          name: 'cases',
          region: 'QC',
          value: 2,
          value_daily: 3,
        },
      ],
      deaths: [
        {
          date: '2021-09-03',
          name: 'deaths',
          region: 'AB',
          value: 10,
          value_daily: 30,
        },
        {
          date: '2021-09-03',
          name: 'deaths',
          region: 'QC',
          value: 40,
          value_daily: 20,
        },
      ],
    },
  },
};

beforeEach(() => {
  mockedAxios.get.mockResolvedValue(mockedData);

  jest.useFakeTimers();
});

test('renders table components', async () => {
  render(
    <RecoilRoot>
      <React.Suspense fallback={'Loading test component...'}>
        <Table />
      </React.Suspense>
    </RecoilRoot>
  );

  expect(await screen.findByText(/région/i)).toBeInTheDocument();
  expect(await screen.findByText(/cumulatif/i)).toBeInTheDocument();
  expect(await screen.findByText(/nouveaux cas/i)).toBeInTheDocument();
  expect(await screen.findByTestId(/table-data-alberta/i)).toBeInTheDocument();
  expect(
    await screen.findByTestId(/table-data-citoyens à l’étranger/i)
  ).toBeInTheDocument();
  expect(await screen.findByTestId(/table-data-canada/i)).toBeInTheDocument();
});

test('sort table depending on sorting mode for deaths', async () => {
  mockDataSet = DataSet.Deaths;

  render(
    <RecoilRoot>
      <React.Suspense fallback={'Loading test component...'}>
        <Table />
      </React.Suspense>
    </RecoilRoot>
  );

  const sortByRegionExpected = 'Alberta';
  const sortByValueExpected = '30';
  const sortByCumulExpected = '40';
  const classNameExpected = 'sort-active';

  const regionButton = (await screen.findByText(/région/i)).parentElement;
  const deathsButton = (await screen.findByText(/décès/i)).parentElement;
  const cumulButton = (await screen.findByText(/cumulatif/i)).parentElement;
  if (regionButton && deathsButton && cumulButton) {
    const tableBody = await screen.findByTestId(/table-body-element/i);

    await fireEvent.click(regionButton);
    expect(tableBody.firstElementChild!.children[0]!.textContent).toBe(
      sortByRegionExpected
    );
    expect(regionButton.className).toContain(classNameExpected);
    expect(deathsButton.className).not.toContain(classNameExpected);
    expect(cumulButton.className).not.toContain(classNameExpected);

    await fireEvent.click(deathsButton);
    expect(tableBody.firstElementChild!.children[1]!.textContent).toBe(
      sortByValueExpected
    );
    expect(regionButton.className).not.toContain(classNameExpected);
    expect(deathsButton.className).toContain(classNameExpected);
    expect(cumulButton.className).not.toContain(classNameExpected);

    await fireEvent.click(cumulButton);
    expect(tableBody.firstElementChild!.children[2]!.textContent).toBe(
      sortByCumulExpected
    );
    expect(regionButton.className).not.toContain(classNameExpected);
    expect(deathsButton.className).not.toContain(classNameExpected);
    expect(cumulButton.className).toContain(classNameExpected);
  }
});

test('sort table depending on sorting mode for new cases', async () => {
  mockDataSet = DataSet.NewCases;

  render(
    <RecoilRoot>
      <React.Suspense fallback={'Loading test component...'}>
        <Table />
      </React.Suspense>
    </RecoilRoot>
  );

  const sortByRegionExpected = 'Alberta';
  const sortByValueExpected = '4';
  const sortByCumulExpected = '2';
  const classNameExpected = 'sort-active';

  const regionButton = (await screen.findByText(/région/i)).parentElement;
  const casesButton = (await screen.findByText(/nouveaux cas/i)).parentElement;
  const cumulButton = (await screen.findByText(/cumulatif/i)).parentElement;
  if (regionButton && casesButton && cumulButton) {
    const tableBody = await screen.findByTestId(/table-body-element/i);

    await fireEvent.click(regionButton);
    expect(tableBody.firstElementChild!.children[0]!.textContent).toBe(
      sortByRegionExpected
    );
    expect(regionButton.className).toContain(classNameExpected);
    expect(casesButton.className).not.toContain(classNameExpected);
    expect(cumulButton.className).not.toContain(classNameExpected);

    await fireEvent.click(casesButton);
    expect(tableBody.firstElementChild!.children[1]!.textContent).toBe(
      sortByValueExpected
    );
    expect(regionButton.className).not.toContain(classNameExpected);
    expect(casesButton.className).toContain(classNameExpected);
    expect(cumulButton.className).not.toContain(classNameExpected);

    await fireEvent.click(cumulButton);
    expect(tableBody.firstElementChild!.children[2]!.textContent).toBe(
      sortByCumulExpected
    );
    expect(regionButton.className).not.toContain(classNameExpected);
    expect(casesButton.className).not.toContain(classNameExpected);
    expect(cumulButton.className).toContain(classNameExpected);
  }
});

test('show correct total data from custom hook', async () => {
  mockDataSet = DataSet.NewCases;

  render(
    <RecoilRoot>
      <React.Suspense fallback={'Loading test component...'}>
        <Table />
      </React.Suspense>
    </RecoilRoot>
  );

  const region = 'Canada';
  let expectedTotal = 0,
    expectedCumulatedTotal = 0;
  mockedData.data.data.cases.forEach((value) => {
    expectedTotal += value.value_daily;
    expectedCumulatedTotal += value.value;
  });

  const totalElement = (await screen.findByTestId(`table-data-${region}`))
    .children[1];
  expect(totalElement.innerHTML).toBe(expectedTotal.toString());
  const totalCumulativeElement = (
    await screen.findByTestId(`table-data-${region}`)
  ).children[2];
  expect(totalCumulativeElement.innerHTML).toBe(
    expectedCumulatedTotal.toString()
  );
});
