import { ViewType } from './ViewType';
import { DataSet } from './DataSet';

export type RouteParams = {
  viewType?: ViewType;
  dataSet?: DataSet;
  date?: string;
}
