/**
 * @param {Date} date
 * @return {boolean}
 */
const isDateValid = (date: Date): boolean => !isNaN(date.valueOf());

/**
 * Format date to API compatible format: '2021-08-31'
 * @param {Date} date
 * @return {string}
 */
export const DateFormatShort = (date: Date): string => {
  if (!isDateValid(date)) {
    return '';
  }
  const [ymd] = date.toISOString().split('T');
  return ymd;
};

/**
 * Format date to human readable format: '26 août 2021'
 * @param {Date} date
 * @return {string}
 */
export const DateFormatLong = (date: Date): string => {
  if (!isDateValid(date)) {
    return '';
  }
  return new Intl.DateTimeFormat(
    'fr-CA',
    {
      formatMatcher: 'basic',
      dateStyle: 'long',
    }
  ).format(date);
};

/**
 * Format date to human readable day of week: 'jeudi'
 * @param {Date} date
 * @return {string}
 */
export const DateFormatWeekday = (date: Date): string => {
  if (!isDateValid(date)) {
    return '';
  }
  return new Intl.DateTimeFormat(
    'fr-CA',
    {
      formatMatcher: 'basic',
      weekday: 'long',
    }
  ).format(date);
};
