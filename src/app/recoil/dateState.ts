import { atom } from 'recoil';

export const dateState = atom<Date | undefined>({
  key: 'dateState',
  // @TODO: complete implementation
  default: new Date(),
});
