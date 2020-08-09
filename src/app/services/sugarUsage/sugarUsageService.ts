import { percent, sum } from '../../../utils/math';
import { AsyncStore } from '../../../storage/AsyncStore';
import { SugarUsage } from './types';

const key = 'sugarUsages';

export const createSugarUsageService = (
  limitPerWeek: number,
  storage: AsyncStore,
) => {
  let usages: SugarUsage[] = [];

  storage.get<SugarUsage[]>(key).then((result) => {
    usages = result ?? [];
  });

  let onChange: (usage: number) => any;

  return {
    hasExceededSugarUsageLimit() {
      return this.getCurrentUsage() >= limitPerWeek;
    },
    getSugarUsageInPercentage() {
      return percent(this.getCurrentUsage(), limitPerWeek);
    },
    getRemainingUsage() {
      return limitPerWeek - this.getCurrentUsage();
    },
    addUsage(usage: number) {
      usages.push({
        amount: usage,
        date: new Date(),
      });

      storage.set(key, usages).catch(console.error);

      if (onChange) {
        onChange(this.getCurrentUsage());
      }
    },
    getCurrentUsage() {
      return sum(...usages.map((usage) => usage.amount));
    },
    onChange(callback: (usage: number) => any) {
      onChange = callback;
    },
    unit: 'g',
  };
};
