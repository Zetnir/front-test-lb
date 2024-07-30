import * as React from 'react';
import { Redirect, Route, Switch as RouterSwitch } from 'react-router-dom';

import { DataSet } from '../app/models/DataSet';
import { ViewType } from '../app/models/ViewType';
import { DateFormatShort } from '../app/services/DateFormat';
import { ROUTES } from './constants';
import { Page } from './pages/page/Page';

export const App: React.FC = () => (
  <RouterSwitch>
    <Route
      exact
      path='/'
      render={() => {
        const route = ROUTES.ROUTER_PATH.replace(':dataSet?', DataSet.NewCases)
          .replace(':viewType?', ViewType.TABLE)
          .replace(':date?', DateFormatShort(new Date()));
        return <Redirect to={route} />;
      }}
    />
    <Route path={ROUTES.ROUTER_PATH} component={Page} />
  </RouterSwitch>
);
