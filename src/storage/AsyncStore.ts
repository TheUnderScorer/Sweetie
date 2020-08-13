import AsyncStorage from '@react-native-community/async-storage';
import { tryParseJson } from 'utils/json';

type OnChange<T> = (value: AsyncStorageValue<T>, key: string) => any;

export type AsyncStorageValue<T> = T | null;

export class AsyncStore {
  #store = AsyncStorage;

  #subscribers: Array<OnChange<any>> = [];

  subscribe(callback: OnChange<any>) {
    const index = this.#subscribers.push(callback);

    return () => {
      this.#subscribers.splice(index, 1);
    };
  }

  async set<T>(key: string, value: AsyncStorageValue<T>) {
    try {
      await this.#store.setItem(key, JSON.stringify(value));

      return true;
    } catch {
      return false;
    }
  }

  async get<T>(
    key: string,
    defaultValue: AsyncStorageValue<T> = null,
  ): Promise<AsyncStorageValue<T>> {
    try {
      const result = await this.#store.getItem(key);

      if (!result) {
        return defaultValue;
      }

      return tryParseJson(result) as T;
    } catch {
      return defaultValue;
    }
  }

  async changed<T>(value: AsyncStorageValue<T>, key: string) {
    await Promise.all(this.#subscribers.map((handler) => handler(value, key)));
  }
}
