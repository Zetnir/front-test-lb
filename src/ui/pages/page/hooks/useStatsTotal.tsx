import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../../app/models/RouteParams';
import { Stats } from '../../../../app/models/Stats';
import {
  ExtractCumulativeStats,
  ExtractStats,
} from '../../../../app/services/StatsExtraction';

/**
 * Return the summ of all data in the given Stats array depending on the current data set
 */
export const useStatsTotal = (statsArray: Stats[]) => {
  const { dataSet } = useParams<RouteParams>();

  const [totalData, setTotalData] = useState(0);
  const [totalCumulativeData, setTotalCumulativeData] = useState(0);
  const [maxCumulativeData, setMaxCumulativeData] = useState(0);

  useEffect(() => {
    let totalData = 0,
      totalCumulativeData = 0,
      maxCumulativeData = 0;
    statsArray.forEach((stats: Stats) => {
      totalData += ExtractStats(stats, dataSet);
      totalCumulativeData += ExtractCumulativeStats(stats, dataSet);
      maxCumulativeData = Math.max(
        ExtractCumulativeStats(stats, dataSet),
        maxCumulativeData
      );
    });
    setTotalData(totalData);
    setTotalCumulativeData(totalCumulativeData);
    setMaxCumulativeData(maxCumulativeData);
  }, [statsArray, dataSet]);

  return [totalData, totalCumulativeData, maxCumulativeData] as const;
};
