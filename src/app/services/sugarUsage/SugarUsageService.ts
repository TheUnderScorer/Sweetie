import { percent, sum } from '../../../utils/math';
import { AsyncStore } from '../../../storage/AsyncStore';
import { SugarUsage } from './types';
import { getRemainingDaysInWeek } from '../../../utils/date';

const key = 'sugarUsages1';

export interface SugarServiceProps {
  limitPerWeek: number;
  storage: AsyncStore;
  onChange?: OnChangeCallback;
}

type OnChangeCallback = (usage: number, service: SugarUsageService) => any;

export class SugarUsageService {
  #storage: AsyncStore;

  #onChangeCallback?: OnChangeCallback;

  #lastRemoved: (SugarUsage & { index: number }) | null = null;

  usages: SugarUsage[] = [];

  readonly unit = 'g';

  public readonly limitPerWeek: number;

  constructor({ limitPerWeek, storage, onChange }: SugarServiceProps) {
    this.limitPerWeek = limitPerWeek;
    this.#storage = storage;
    this.#onChangeCallback = onChange;

    storage.get<SugarUsage[]>(key).then(async (result) => {
      this.usages = result ?? [];

      await this.changed();
    });
  }

  get hasExceededSugarUsageLimit() {
    return this.currentUsage >= this.limitPerWeek;
  }

  get remainingUsage() {
    const remain = this.limitPerWeek - this.currentUsage;

    return remain < 0 ? 0 : remain;
  }

  get sugarUsageInPercentage() {
    return percent(this.currentUsage, this.limitPerWeek);
  }

  get currentUsage() {
    if (!this.usages.length) {
      return 0;
    }

    return sum(...this.usages.map((usage) => usage.amount));
  }

  onChange(callback: (usage: number) => any) {
    this.#onChangeCallback = callback;
  }

  async reset() {
    this.usages = [];

    await this.changed();
  }

  async addUsage(usage: number) {
    this.usages.push({
      amount: usage,
      date: new Date(),
    });

    await this.changed();
  }

  private async changed() {
    await this.#storage.set(key, this.usages).catch(console.error);

    if (this.#onChangeCallback) {
      this.#onChangeCallback(this.currentUsage, this);
    }
  }

  async removeUsage(index: number) {
    this.#lastRemoved = {
      ...this.usages[index],
      index,
    };

    this.usages.splice(index, 1);

    await this.changed();
  }

  async restoreLastItem() {
    if (!this.#lastRemoved) {
      return false;
    }

    const { index, ...item } = this.#lastRemoved;
    this.usages.splice(index, 0, item);

    await this.changed();

    return true;
  }

  get remainingUsagePerDay() {
    const remainingDays = getRemainingDaysInWeek();

    if (!this.remainingUsage) {
      return 0;
    }

    return this.remainingUsage / remainingDays;
  }
}
