import { DataSet } from "../models/DataSet";
import { Stats } from "../models/Stats";

/**
 * Get the correct data value depending on the route's dataset
 * @param {Stats} stats
 * @param {DataSet} dataSet
 * @return {number}
 */
export const ExtractStats = (stats: Stats, dataSet: DataSet | undefined): number => {
  switch (dataSet) {
    case DataSet.NewCases:
      return stats.cases;
    case DataSet.Deaths:
      return stats.deaths;
    default:
      return 0;
  }
};

/**
 * Get the correct cumulative data value depending on the route's dataset
 * @param {Stats} stats
 * @param {DataSet} dataSet
 * @return {number}
 */
export const ExtractCumulativeStats = (stats: Stats, dataSet: DataSet | undefined): number => {
  switch (dataSet) {
    case DataSet.NewCases:
      return stats.cumulativeCases;
    case DataSet.Deaths:
      return stats.cumulativeDeaths;
    default:
      return 0;
  }
};
