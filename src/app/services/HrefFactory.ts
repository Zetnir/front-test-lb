import { DataSet } from '../models/DataSet';
import { ViewType } from '../models/ViewType';

export const HrefFactory = (dataSet: DataSet, viewType: ViewType, date: string): string => `/${dataSet}/${viewType}/${date}`;
