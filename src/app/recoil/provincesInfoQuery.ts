import axios from 'axios';
import { selector } from 'recoil';
import { API_BASE_URL, PROVINCES_NAMES } from '../../ui/constants';
import { Province, Provinces } from '../models/Province';

export const provincesInfoQuery = selector<Provinces>({
  key: 'provincesInfoQuery',
  get: async () => {
    // @TODO: complete implementation
    let provincesInfo = new Map<Province['token'], Province>() as Provinces;

    const results = await axios.get(API_BASE_URL + "summary"); 
    const dataProvinces = Array.from(results.data.data);

    dataProvinces.forEach((dataProvince: any, index: number) => {
      const code = dataProvince.region as string;
      const province = {  
        name: PROVINCES_NAMES[code].name,
        sort: PROVINCES_NAMES[code].sort,
        token: index.toString(),
        code: code} as Province;
      provincesInfo.set(index.toString(), province);
    })

    return provincesInfo;
  },
});
