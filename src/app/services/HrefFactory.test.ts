import { DataSet } from '../models/DataSet';
import { ViewType } from '../models/ViewType';

import { HrefFactory } from './HrefFactory';

describe('HrefFactory', () => {
  const expectedDate = "2022-01-03";
  it('should return the correct link: "/nouveaux-cas/tableau/2022-01-03"', () => {
    const value = HrefFactory(DataSet.NewCases, ViewType.TABLE, expectedDate);
    expect(value).toBe(`/nouveaux-cas/tableau/${expectedDate}`);
  });
  it('should return the correct link: "/nouveaux-cas/carte/2022-01-03"', () => {
    const value = HrefFactory(DataSet.NewCases, ViewType.MAP, expectedDate);
    expect(value).toBe(`/nouveaux-cas/carte/${expectedDate}`);
  });
  it('should return the correct link: "/deces/tableau/2022-01-03"', () => {
    const value = HrefFactory(DataSet.Deaths, ViewType.TABLE, expectedDate);
    expect(value).toBe(`/deces/tableau/${expectedDate}`);
  });
});
