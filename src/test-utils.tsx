import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { MemoryRouter, Route, Switch } from 'react-router';

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <MemoryRouter initialEntries={['/nouveaux-cas/tableau']}>
      <Switch>
        <Route path='/:dataSet?/:viewType?'>
          <RecoilRoot>{children}</RecoilRoot>
        </Route>
      </Switch>
    </MemoryRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
