import * as React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilState } from 'recoil';

import { DataSet } from '../../../app/models/DataSet';
import { RouteParams } from '../../../app/models/RouteParams';
import { ViewType } from '../../../app/models/ViewType';
import { dateState } from '../../../app/recoil/dateState';
import { HrefFactory } from '../../../app/services/HrefFactory';
import { MainNav } from '../../organisms/mainNav/MainNav';
import { ErrorFallback } from '../../ErrorFallback';
import MutatingDots from 'react-loader-spinner/dist/loader/MutatingDots';
import { DateFormatShort } from '../../../app/services/DateFormat';
import { useEffect } from 'react';

const TableView = React.lazy(() =>
  import('./components/table/TableView').then(({ TableView }) => ({
    default: TableView,
  }))
);
const MapView = React.lazy(() =>
  import('./components/map/MapView').then(({ MapView }) => ({
    default: MapView,
  }))
);

export const Page: React.FC = () => {
  const [dateValue, setDateValue] = useRecoilState(dateState);

  const { viewType, dataSet, date } = useParams<RouteParams>();

  useEffect(() => {
    setDateValue(new Date((date ?? '') + ' '));
  }, [date, setDateValue]);

  if (!viewType || (viewType !== ViewType.MAP && viewType !== ViewType.TABLE)) {
    return (
      <Redirect
        to={HrefFactory(
          dataSet ?? DataSet.NewCases,
          ViewType.TABLE,
          date ?? DateFormatShort(dateValue ?? new Date())
        )}
      />
    );
  }

  if (
    !dataSet ||
    (dataSet !== DataSet.NewCases && dataSet !== DataSet.Deaths)
  ) {
    return (
      <Redirect
        to={HrefFactory(
          DataSet.NewCases,
          viewType,
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
          viewType,
          DateFormatShort(dateValue ?? new Date())
        )}
      />
    );
  }

  return (
    <div className='grid grid-cols-data h-screen'>
      <MainNav />
      <div className='p-8 md:p-12 lg:py-16 lg:px-20'>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <React.Suspense
            fallback={
              <div className='w-full h-full flex justify-center items-center'>
                <MutatingDots
                  height='100'
                  width='100'
                  color='rgb(200,30,30)'
                  secondaryColor='rgb(50,50,80)'
                  radius='15'
                  ariaLabel='mutating-dots-loading'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible={true}
                />
              </div>
            }
          >
            {viewType === ViewType.TABLE ? <TableView /> : <MapView />}
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};
