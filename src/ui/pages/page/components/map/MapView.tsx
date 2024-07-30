import * as React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { DataSet } from '../../../../../app/models/DataSet';
import { RouteParams } from '../../../../../app/models/RouteParams';
import { ViewType } from '../../../../../app/models/ViewType';
import { HrefFactory } from '../../../../../app/services/HrefFactory';
import { ViewSwitch } from '../../../../atoms/viewSwitch/ViewSwitch';
import Canada from 'react-canada-map';
import { useRecoilValue } from 'recoil';
import { statsQuery } from '../../../../../app/recoil/statsQuery';
import { useStatsTotal } from '../../hooks/useStatsTotal';
import { ExtractCumulativeStats } from '../../../../../app/services/StatsExtraction';
import { Stats } from '../../../../../app/models/Stats';
import './MapView.css';
import { useCustomMapData } from '../../hooks/useCustomMapData';
import { DateFormatShort } from '../../../../../app/services/DateFormat';
import { dateState } from '../../../../../app/recoil/dateState';

export const MapView: React.FC = () => {
  const dateValue = useRecoilValue(dateState);

  const { dataSet, viewType, date } = useParams<RouteParams>();

  const statsMap = useRecoilValue(statsQuery);

  // Custom hook to populate the Canada component with additionnal DOM elements
  useCustomMapData(statsMap);

  const [, , maxCumulativeData] = useStatsTotal(Array.from(statsMap.values()));

  const calculateColor = (provinceCode: string): string => {
    const MIN_OPACITY = 0.5;
    const MAX_BLUE_COLOR = 80;
    const MAX_RED_COLOR = 150;
    const MIN_COLOR = 50;

    const cumulativeStats = ExtractCumulativeStats(
      statsMap.get(provinceCode) ?? ({} as Stats),
      dataSet
    );
    const ratioValue = cumulativeStats / maxCumulativeData;

    const red = MAX_RED_COLOR * ratioValue + MIN_COLOR;
    const opacity = Math.max(ratioValue, MIN_OPACITY);
    const blue = Math.min(MIN_COLOR / ratioValue, MAX_BLUE_COLOR);
    const green = MIN_COLOR;

    return `rgba(${red},${green},${blue},${opacity})`;
  };

  const customizeProvinces = () => {
    const hoverColor = 'rgb(50,50,50)';
    return {
      AB: {
        fillColor: calculateColor('AB'),
        onHoverColor: hoverColor,
      },
      BC: {
        fillColor: calculateColor('BC'),
        onHoverColor: hoverColor,
      },
      MB: {
        fillColor: calculateColor('MB'),
        onHoverColor: hoverColor,
      },
      NB: {
        fillColor: calculateColor('NB'),
        onHoverColor: hoverColor,
      },
      NL: {
        fillColor: calculateColor('NL'),
        onHoverColor: hoverColor,
      },
      NS: {
        fillColor: calculateColor('NS'),
        onHoverColor: hoverColor,
      },
      NU: {
        fillColor: calculateColor('NU'),
        onHoverColor: hoverColor,
      },
      NT: {
        fillColor: calculateColor('NT'),
        onHoverColor: hoverColor,
      },
      ON: {
        fillColor: calculateColor('ON'),
        onHoverColor: hoverColor,
      },
      PE: {
        fillColor: calculateColor('PE'),
        onHoverColor: hoverColor,
      },
      QC: {
        fillColor: calculateColor('QC'),
        onHoverColor: hoverColor,
      },
      SK: {
        fillColor: calculateColor('SK'),
        onHoverColor: hoverColor,
      },
      YT: {
        fillColor: calculateColor('YT'),
        onHoverColor: hoverColor,
      },
    };
  };

  if (!dataSet) {
    return (
      <Redirect
        to={HrefFactory(
          DataSet.NewCases,
          viewType ?? ViewType.MAP,
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
          viewType ?? ViewType.MAP,
          DateFormatShort(dateValue ?? new Date())
        )}
      />
    );
  }

  return (
    <div className='h-full' data-testid='map-element'>
      <ViewSwitch />
      <div
        className='grid justify-center items-center'
        style={{ height: 'calc(100% - 2rem)' }}
      >
        {statsMap ? (
          <div data-testid='canada-element'>
            <Canada
              customize={customizeProvinces()}
              height={600}
              width={1000}
            ></Canada>
          </div>
        ) : (
          <div>Impossible de charger la carte...</div>
        )}
      </div>
    </div>
  );
};
