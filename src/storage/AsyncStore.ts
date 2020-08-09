import AsyncStorage from '@react-native-community/async-storage';
import { tryParseJson } from '../utils/json';

export class AsyncStore {
  #store = AsyncStorage;

  async set(key: string, value: any) {
    try {
      await this.#store.setItem(key, JSON.stringify(value));

      return true;
    } catch {
      return false;
    }
  }

  async get<T>(key: string, defaultValue: T | null = null): Promise<T | null> {
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
}
