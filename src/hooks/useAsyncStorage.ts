import { useCallback, useEffect, useState } from 'react';
import { useAsyncStorageContext } from '../app/providers/AsyncStorageProvider';
import { AsyncStorageValue } from '../storage/AsyncStore';

type AsyncStorageHookResult<T> = {
  value: AsyncStorageValue<T>;
  setValue: (value: AsyncStorageValue<T>) => Promise<void>;
  didFetch: boolean;
};

export const useAsyncStorage = <T>(key: string): AsyncStorageHookResult<T> => {
  const [value, setValue] = useState<AsyncStorageValue<T>>(null);
  const [didFetch, setDidFetch] = useState(false);
  const { storage } = useAsyncStorageContext();

  useEffect(() => {
    const unsubscribe = storage.subscribe((changedValue, changedKey) => {
      if (changedKey !== key) {
        return;
      }

      setValue(changedValue);
    });

    return () => {
      unsubscribe();
    };
  }, [key, storage]);

  const set = useCallback(
    async (newValue: AsyncStorageValue<T>) => {
      await storage.set(key, newValue);
    },
    [key, storage],
  );

  useEffect(() => {
    storage.get<T>(key).then((storageValue) => {
      setValue(storageValue);
      setDidFetch(true);
    });
  });

  return {
    value,
    setValue: set,
    didFetch,
  };
};
