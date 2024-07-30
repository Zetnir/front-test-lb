import * as React from 'react';
import classnames from 'classnames';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { RouteParams } from '../../../../../app/models/RouteParams';
import { TranslateDataSet } from '../../../../../app/services/TranslateDataSet';
import { Sorting, sortState } from '../../../../../app/recoil/sortState';

import './Table.css';
import { statsQuery } from '../../../../../app/recoil/statsQuery';
import { Stats } from '../../../../../app/models/Stats';
import { TableData } from './TableData';
import { PROVINCES_NAMES } from '../../../../constants';
import { useStatsTotal } from '../../hooks/useStatsTotal';
import {
  ExtractCumulativeStats,
  ExtractStats,
} from '../../../../../app/services/StatsExtraction';
import { SortStatsArray } from '../../../../../app/services/StatsArraySorting';

export const Table: React.FC = () => {
  const { dataSet } = useParams<RouteParams>();
  const [sorting, setSorting] = useRecoilState(sortState);

  const statsMap = useRecoilValue(statsQuery);

  const [totalData, totalCumulativeData] = useStatsTotal(
    Array.from(statsMap.values())
  );

  // Sorted stats array based on the stats map we got from recoil statsQuery
  const sortedStats = React.useMemo(
    () => SortStatsArray(Array.from(statsMap.values()), dataSet, sorting),
    [sorting, statsMap, dataSet]
  );

  const label = React.useMemo(() => TranslateDataSet(dataSet), [dataSet]);

  return (
    <table data-testid='table-element' className='data-table'>
      <thead>
        <tr>
          <th
            className={classnames('head-cell text-left', {
              'sort-active': sorting === Sorting.Name,
            })}
            onClick={() => setSorting(Sorting.Name)}
          >
            <span>Région</span>
          </th>
          <th
            className={classnames('head-cell', {
              'sort-active': sorting === Sorting.Value,
            })}
            onClick={() => setSorting(Sorting.Value)}
          >
            <span>{label}</span>
          </th>
          <th
            className={classnames('head-cell', {
              'sort-active': sorting === Sorting.Cumul,
            })}
            onClick={() => setSorting(Sorting.Cumul)}
          >
            <span>Cumulatif</span>
          </th>
        </tr>
      </thead>
      <tbody data-testid='table-body-element'>
        {sortedStats &&
          Array.from(sortedStats).map((stats: Stats, index: number) => {
            return (
              <TableData
                key={index}
                data={ExtractStats(stats, dataSet)}
                cumulativeData={ExtractCumulativeStats(stats, dataSet)}
                region={stats.province.name}
              />
            );
          })}
        {/* @TODO : Ask what data to put in RP ? is it as fixed value or a value who must be put in the array? */}
        <TableData
          className='transparent'
          data={0}
          cumulativeData={0}
          region={PROVINCES_NAMES['RP'].name}
        />
        <TableData
          className='gray-200'
          data={totalData}
          cumulativeData={totalCumulativeData}
          region={'Canada'}
        />
      </tbody>
    </table>
  );
};
