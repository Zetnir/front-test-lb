import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ShowDate.css';

import { dateState } from '../../../app/recoil/dateState';
import {
  DateFormatLong,
  DateFormatShort,
  DateFormatWeekday,
} from '../../../app/services/DateFormat';
import { Redirect, useParams } from 'react-router-dom';
import { RouteParams } from '../../../app/models/RouteParams';
import { HrefFactory } from '../../../app/services/HrefFactory';
import { DataSet } from '../../../app/models/DataSet';
import { ViewType } from '../../../app/models/ViewType';
import { useState } from 'react';

export const ShowDate: React.FC = () => {
  const dateValue = useRecoilValue(dateState);

  const { dataSet, viewType, date } = useParams<RouteParams>();

  const [tempDate, setTempDate] = useState(new Date((date ?? '') + ' '));

  const day = React.useMemo(
    () => DateFormatWeekday(dateValue ?? new Date()),
    [dateValue]
  );
  const dateStr = React.useMemo(
    () => DateFormatLong(dateValue ?? new Date()),
    [dateValue]
  );

  const [showCalendar, setShowCalendar] = React.useState(false);

  const onChange = (value: Date) => {
    setShowCalendar(false);
    setTempDate(value);
  };

  if (tempDate && DateFormatShort(tempDate) !== date) {
    return (
      <Redirect
        to={HrefFactory(
          dataSet ?? DataSet.NewCases,
          viewType ?? ViewType.TABLE,
          DateFormatShort(tempDate)
        )}
      />
    );
  }

  return (
    <div>
      <button
        data-testid='date-button'
        className='py-1 border-1 text-gray-500 hover:text-red-600 bg-white px-4 py-2 rounded'
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <span className='capitalize'>{day}</span>, {dateStr}
        {showCalendar ? (
          <i
            data-testid='xmark-calendar-icon'
            className='ml-2 fa-regular fa-calendar-xmark'
          ></i>
        ) : (
          <i
            data-testid='calendar-icon'
            className='ml-2 fa-solid fa-calendar'
          ></i>
        )}
      </button>
      {showCalendar && (
        <div data-testid='calendar-element'>
          <Calendar
            className='calendar-position'
            maxDate={new Date()}
            onChange={onChange}
            value={dateValue}
          />
        </div>
      )}
    </div>
  );
};
