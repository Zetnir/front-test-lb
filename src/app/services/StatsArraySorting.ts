import { DataSet } from "../models/DataSet";
import { Stats } from "../models/Stats";
import { Sorting } from "../recoil/sortState";
import { ExtractCumulativeStats, ExtractStats } from "./StatsExtraction";

// Constants used for sorting comparison
const TAKE_FIRST = 1;
const TAKE_SECOND = -1;

/**
 * Return the given stats array sorted depending on the sorting option
 * @param {Stats} stats
 * @param {DataSet | undefined} dataSet
 * @param {Sorting} [sorting]
 * @return {number}
 */
export const SortStatsArray = (statsArray: Stats[],dataSet: DataSet | undefined, sorting?: Sorting): Stats[] => {
  let sortedStats = statsArray;
    switch (sorting) {
      case Sorting.Cumul:
        sortedStats.sort((firstStats, secondStats) =>
          ExtractCumulativeStats(firstStats, dataSet) <
          ExtractCumulativeStats(secondStats, dataSet)
            ? TAKE_FIRST
            : TAKE_SECOND
        );
        break;
      case Sorting.Name:
        sortedStats.sort((firstStats, secondStats) =>
          firstStats.province.name.localeCompare(secondStats.province.name)
        );
        break;
      case Sorting.Value:
        sortedStats.sort((firstStats, secondStats) =>
          ExtractStats(firstStats, dataSet) < ExtractStats(secondStats, dataSet)
            ? TAKE_FIRST
            : TAKE_SECOND
        );
        break;
      default:
        break;
    }
    return sortedStats;
};
