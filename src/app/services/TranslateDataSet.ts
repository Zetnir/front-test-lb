import { DataSet } from '../models/DataSet';

export const TranslateDataSet = (dataSet?: DataSet): string => {
  switch (dataSet) {
    case DataSet.Deaths:
      return 'Décès';
    case DataSet.NewCases:
    default:
      return 'Nouveaux cas';
  }
}
