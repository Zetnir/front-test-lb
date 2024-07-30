import { DateFormatLong, DateFormatShort, DateFormatWeekday } from './DateFormat';

describe('DateFormatShort', () => {
  it('should return a valid date string: "2021-01-15"', () => {
    const date = new Date(2021, 0, 15, 12, 0);
    const start = DateFormatShort(date);
    expect(start).toEqual('2021-01-15');
  });
  it('should return a valid date string on december 31', () => {
    // This will be December 31th, because { date: 0 } will backward 1 day
    const date = new Date(2021, 0, 0, 0, 0);
    const start = DateFormatShort(date);
    expect(start).toEqual('2020-12-31');
  });
  it('should return empty string on invalid date', () => {
    const date = new Date('patate');
    const start = DateFormatShort(date);
    expect(start).toEqual('');
  });
});

describe('DateFormatLong', () => {
  it('should return a valid date string in French: "15 janvier 2021"', () => {
    const date = new Date(2021, 0, 15, 12, 0);
    const start = DateFormatLong(date);
    expect(start).toEqual('15 janvier 2021');
  });
  it('should return empty string on invalid date', () => {
    const date = new Date('carotte');
    const start = DateFormatLong(date);
    expect(start).toEqual('');
  });
});

describe('DateFormatWeekday', () => {
  it('should return a valid day of week in French: "vendredi"', () => {
    const date = new Date(2021, 0, 15, 12, 0);
    const start = DateFormatWeekday(date);
    expect(start).toEqual('vendredi');
  });
  it('should return empty string on invalid date', () => {
    const date = new Date('chou');
    const start = DateFormatWeekday(date);
    expect(start).toEqual('');
  });
});
