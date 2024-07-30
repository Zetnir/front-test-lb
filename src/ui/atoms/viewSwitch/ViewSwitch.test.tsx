import axios from 'axios';
import React from 'react';
import { DataSet } from '../../../app/models/DataSet';
import { ViewType } from '../../../app/models/ViewType';
import { fireEvent, render, screen } from '../../../test-utils';
import { ViewSwitch } from './ViewSwitch';

// Mock params and setter
let mockViewType = ViewType.TABLE;
let mockDataSet = DataSet.NewCases;
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    viewType: mockViewType,
    dataSet: mockDataSet,
  }),
  useRouteMatch: () => ({ url: `/${mockDataSet}/${mockViewType}` }),
}));

test('renders viewSwitch component for ViewType.TABLE', async () => {
  mockViewType = ViewType.TABLE;
  const listName = 'Liste';
  const mapName = 'Carte';

  render(<ViewSwitch />);

  expect(
    screen.getByTestId('view-switch-selected-item-element').textContent
  ).toContain(listName);
  expect(screen.getByTestId('view-switch-item-element').textContent).toContain(
    mapName
  );
});

test('renders viewSwitch component for ViewType.MAP', async () => {
  mockViewType = ViewType.MAP;
  const listName = 'Liste';
  const mapName = 'Carte';

  render(<ViewSwitch />);

  expect(
    screen.getByTestId('view-switch-selected-item-element').textContent
  ).toContain(mapName);
  expect(screen.getByTestId('view-switch-item-element').textContent).toContain(
    listName
  );
});
