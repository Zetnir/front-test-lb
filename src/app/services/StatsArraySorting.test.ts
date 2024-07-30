import { DataSet } from '../models/DataSet';
import { Province } from '../models/Province';
import { Stats } from '../models/Stats';
import { Sorting } from '../recoil/sortState';
import { SortStatsArray } from './StatsArraySorting';

describe('SortStatsArray', () => {
  it('should sort stats array by descending cases value', () => {
    const statsArray = [
      {cases: 2},
      {cases: 1},
      {cases: 4},
      {cases: 3},
    ] as Stats[];

    const expectedStatsArray = [
      {cases: 4},
      {cases: 3},
      {cases: 2},
      {cases: 1},
    ] as Stats[];
    const dataSet = DataSet.NewCases;
    const sorting = Sorting.Value;

    const value = SortStatsArray(statsArray, dataSet, sorting);
    expect(value).toMatchObject(expectedStatsArray);
  });

  it('should sort stats array by descending deaths value', () => {
    const statsArray = [
      {deaths: 1},
      {deaths: 4},
      {deaths: 3},
      {deaths: 2},
    ] as Stats[];

    const expectedStatsArray = [
      {deaths: 4},
      {deaths: 3},
      {deaths: 2},
      {deaths: 1},
    ] as Stats[];
    const dataSet = DataSet.Deaths;
    const sorting = Sorting.Value;

    const value = SortStatsArray(statsArray, dataSet, sorting);
    expect(value).toMatchObject(expectedStatsArray);
  });

  it('should sort stats array by descending cumulativeCases value', () => {
    const statsArray = [
      {cumulativeCases: 3},
      {cumulativeCases: 4},
      {cumulativeCases: 2},
      {cumulativeCases: 1},
    ] as Stats[];

    const expectedStatsArray = [
      {cumulativeCases: 4},
      {cumulativeCases: 3},
      {cumulativeCases: 2},
      {cumulativeCases: 1},
    ] as Stats[];
    const dataSet = DataSet.NewCases;
    const sorting = Sorting.Cumul;

    const value = SortStatsArray(statsArray, dataSet, sorting);
    expect(value).toMatchObject(expectedStatsArray);
  });

  it('should sort stats array by descending cumulativeDeaths value', () => {
    const statsArray = [
      {cumulativeDeaths: 2},
      {cumulativeDeaths: 3},
      {cumulativeDeaths: 1},
      {cumulativeDeaths: 4},
    ] as Stats[];

    const expectedStatsArray = [
      {cumulativeDeaths: 4},
      {cumulativeDeaths: 3},
      {cumulativeDeaths: 2},
      {cumulativeDeaths: 1},
    ] as Stats[];
    const dataSet = DataSet.Deaths;
    const sorting = Sorting.Cumul;

    const value = SortStatsArray(statsArray, dataSet, sorting);
    expect(value).toMatchObject(expectedStatsArray);
  });

  it('should sort stats array by name regardless of dataset', () => {
    const statsArray = [
      {province: {name: "BC"} as Province},
      {province: {name: "AB"} as Province},
      {province: {name: "DE"} as Province},
      {province: {name: "CD"} as Province}
    ] as Stats[];

    const expectedStatsArray = [
      {province: {name: "AB"} as Province},
      {province: {name: "BC"} as Province},
      {province: {name: "CD"} as Province},
      {province: {name: "DE"} as Province}
    ] as Stats[];
    const sorting = Sorting.Name;

    const valueDataSetCases = SortStatsArray(statsArray, DataSet.NewCases, sorting);
    const valueDataSetCumul = SortStatsArray(statsArray, DataSet.Deaths, sorting);
    expect(valueDataSetCases).toMatchObject(expectedStatsArray);
    expect(valueDataSetCumul).toMatchObject(expectedStatsArray);
  });

  it('should not sort stats array', () => {
    const statsArray = [
      {cases: 1, deaths: 4, cumulativeCases: 3, cumulativeDeaths: 2},
      {cases: 2, deaths: 1, cumulativeCases: 4, cumulativeDeaths: 3},
      {cases: 4, deaths: 3, cumulativeCases: 2, cumulativeDeaths: 1},
      {cases: 3, deaths: 2, cumulativeCases: 1, cumulativeDeaths: 4},
    ] as Stats[];

    const dataSet = DataSet.Deaths;

    const value = SortStatsArray(statsArray, dataSet);
    expect(value).toMatchObject(statsArray);
  });
});
