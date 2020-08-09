import { atom } from 'recoil';

// Sugar usage in grams
export const sugarUsage = atom<number>({
  key: 'sugarUsage',
  default: 0,
});
