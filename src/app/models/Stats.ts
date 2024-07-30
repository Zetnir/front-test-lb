import { Province } from './Province';

export type Stats = {
  cases: number;
  deaths: number;
  cumulativeCases: number;
  cumulativeDeaths: number;
  province: Province;
};

export type StatsByProvinces = Map<Province['code'], Stats>;

export type StatsByDates = Map<Date, StatsByProvinces>;
