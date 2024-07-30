import axios from 'axios';

import { selector } from 'recoil';
import { API_BASE_URL, PROVINCES_NAMES } from '../../ui/constants';
import { Province } from '../models/Province';
import { StatsByProvinces, Stats } from '../models/Stats';
import { dateState } from './dateState';

type dataByProvinces = {
  date: string;
  name: string;
  region : string;
  value: number;
  value_daily: number;
}

export const statsQuery = selector<StatsByProvinces>({
  key: 'statsQuery',
  get: async ({get}) => {
    // @TODO: complete implementation
    // Get date from dateState atom
    const date = get(dateState) ?? new Date();
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const formattedDate = `${year}-${month}-${day}`

    const results = await axios.get(API_BASE_URL + 'timeseries', {params: {date: formattedDate, fill: true}});
    const data = results.data.data;

    const casesByProvinces: dataByProvinces[] = data.cases;
    const deathByProvinces: dataByProvinces[] = data.deaths;

    let StatsByProvinces = new Map<Province['code'], Stats>() as StatsByProvinces;

    let provincesToken = 0;
    for(const key in PROVINCES_NAMES){
      // I don't add RP to the array because i assume that its a fixed value added at the end of the table
      if(key === "RP")
        continue;

      const province: Province = {
        name: PROVINCES_NAMES[key].name,
        sort: PROVINCES_NAMES[key].sort,
        token: provincesToken.toString(),
        code: key};
      const stats: Stats = {
        cases: 0,
        cumulativeCases: 0,
        deaths: 0,
        cumulativeDeaths: 0,
        province: province,
      };
      StatsByProvinces.set(key, stats);
      provincesToken+= provincesToken;
    }

    casesByProvinces.forEach((cases: dataByProvinces, index: number) => {
      const code = cases.region;

      const stats: Stats = {
        ...StatsByProvinces.get(code)!,
        cases: cases.value_daily,
        cumulativeCases: cases.value,
      };

      StatsByProvinces.set(code, stats);
    });

    deathByProvinces.forEach((deaths: dataByProvinces, index: number) => {
      const code = deaths.region;

      const stats: Stats = {
        ...StatsByProvinces.get(code)!,
        deaths: deaths.value_daily,
        cumulativeDeaths: deaths.value,
      };

      StatsByProvinces.set(code, stats);
    });

    return StatsByProvinces;
  },
});
