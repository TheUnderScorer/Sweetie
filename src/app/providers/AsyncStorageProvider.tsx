import React, { createContext, FC, useContext, useMemo } from 'react';
import { AsyncStore } from 'storage/AsyncStore';

const defaultValue: AsyncStorageContextType = {
  storage: new AsyncStore(),
};

export interface AsyncStorageContextType {
  storage: AsyncStore;
}

const AsyncStorageContext = createContext<AsyncStorageContextType>(
  defaultValue,
);
export const useAsyncStorageContext = () => useContext(AsyncStorageContext);

export interface AsyncStorageProviderProps {
  defaultStorage?: AsyncStore;
}

export const AsyncStorageProvider: FC<AsyncStorageProviderProps> = ({
  children,
  defaultStorage,
}) => {
  const ctxValue = useMemo(
    () => ({
      storage: defaultStorage ?? new AsyncStore(),
    }),
    [defaultStorage],
  ) as AsyncStorageContextType;

  return (
    <AsyncStorageContext.Provider value={ctxValue}>
      {children}
    </AsyncStorageContext.Provider>
  );
};
