import { atom } from 'recoil';

export enum Sorting {
  Name,
  Value,
  Cumul,
}

export const sortState = atom<Sorting>({
  key: 'sortState',
  default: Sorting.Value,
});
