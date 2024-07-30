import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../../../test-utils';
import { MainNav } from './MainNav';

test('renders mainNav component', async () => {
  render(<MainNav />);

  const titleElement = screen.getByText(/panacée/i);
  expect(titleElement).toBeInTheDocument();

  const casesElement = screen.getByText(/nouveaux cas/i);
  expect(casesElement).toBeInTheDocument();

  const deathsElement = screen.getByText(/décès/i);
  expect(deathsElement).toBeInTheDocument();
});
