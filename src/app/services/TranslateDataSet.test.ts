import { DataSet } from '../models/DataSet';

import { TranslateDataSet } from './TranslateDataSet';

describe('TranslateDataSet', () => {
  it('should translate NewCases in french', () => {
    const value = TranslateDataSet(DataSet.NewCases);
    expect(value).toBe('Nouveaux cas');
  });
  it('should translate Deaths in french', () => {
    const value = TranslateDataSet(DataSet.Deaths);
    expect(value).toBe('Décès');
  });
  it('should translate to NewCases in french when nil', () => {
    const value = TranslateDataSet();
    expect(value).toBe('Nouveaux cas');
  });
});
