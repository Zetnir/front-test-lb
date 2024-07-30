import { DataSet } from '../models/DataSet';
import { Province } from '../models/Province';
import { Stats } from '../models/Stats';
import { ExtractCumulativeStats, ExtractStats } from './StatsExtraction';

describe('ExtractStats', () => {
  it('should extract stats cases value', () => {
    const dataSet = DataSet.NewCases;
    const stats = {cases: 1, deaths: 2, cumulativeCases: 3, cumulativeDeaths: 4, province: {} as Province} as Stats;
    const value = ExtractStats(stats, dataSet);
    expect(value).toBe(stats.cases);
  });
  it('should extract stats deaths value', () => {
    const dataSet = DataSet.Deaths;
    const stats = {cases: 1, deaths: 2, cumulativeCases: 3, cumulativeDeaths: 4, province: {} as Province} as Stats;
    const value = ExtractStats(stats, dataSet);
    expect(value).toBe(stats.deaths);
  });
  it('should return 0 if dataset is undefined', () => {
    const dataSet = undefined;
    const stats = {cases: 1, deaths: 2, cumulativeCases: 3, cumulativeDeaths: 4, province: {} as Province} as Stats;
    const value = ExtractStats(stats, dataSet);
    expect(value).toBe(0);
  });
});

describe('ExtractCumulativeStats', () => {
  it('should extract stats cumulativeCases value', () => {
    const dataSet = DataSet.NewCases;
    const stats = {cases: 1, deaths: 2, cumulativeCases: 3, cumulativeDeaths: 4, province: {} as Province} as Stats;
    const value = ExtractCumulativeStats(stats, dataSet);
    expect(value).toBe(stats.cumulativeCases);
  });
  it('should extract stats cumulativeDeaths value', () => {
    const dataSet = DataSet.Deaths;
    const stats = {cases: 1, deaths: 2, cumulativeCases: 3, cumulativeDeaths: 4, province: {} as Province} as Stats;
    const value = ExtractCumulativeStats(stats, dataSet);
    expect(value).toBe(stats.cumulativeDeaths);
  });
  it('should return 0 if dataset is undefined', () => {
    const dataSet = undefined;
    const stats = {cases: 1, deaths: 2, cumulativeCases: 3, cumulativeDeaths: 4, province: {} as Province} as Stats;
    const value = ExtractCumulativeStats(stats, dataSet);
    expect(value).toBe(0);
  });
});
