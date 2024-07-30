import axios from 'axios';
import React from 'react';
import { render, screen } from '../../../test-utils';
import { ViewSwitchItem } from './ViewSwitchItem';

test('renders viewSwitchItem not selected', () => {
  let selected = false;
  const switchName = 'Test';
  render(
    <ViewSwitchItem href='#' selected={selected}>
      {switchName}
    </ViewSwitchItem>
  );
  expect(screen.getByTestId('view-switch-item-element').textContent).toContain(
    switchName
  );
});

test('renders viewSwitchItem selected', () => {
  let selected = true;
  const switchName = 'Test';
  render(
    <ViewSwitchItem href='#' selected={selected}>
      {switchName}
    </ViewSwitchItem>
  );
  expect(
    screen.getByTestId('view-switch-selected-item-element').textContent
  ).toContain(switchName);
});
