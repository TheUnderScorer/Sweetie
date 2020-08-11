import React, { createContext, FC, useContext, useMemo, useState } from 'react';
import { useAsyncStorageContext } from './AsyncStorageProvider';
import { SugarUsage } from '../services/sugarUsage/types';
import { SugarUsageService } from '../services/sugarUsage/SugarUsageService';

const defaultValue: SugarUsageContextType = {
  addUsage(): Promise<void> {
    return Promise.resolve(undefined);
  },
  hasExceeded: false,
  percentUsage: 0,
  remainingUsage: 0,
  removeUsage(): Promise<void> {
    return Promise.resolve(undefined);
  },
  reset(): Promise<void> {
    return Promise.resolve(undefined);
  },
  sugarUsage: 0,
  unit: '',
  usages: [],
  restoreLastItem: () => Promise.resolve(false),
};

export interface SugarUsageContextType {
  sugarUsage: number;
  percentUsage: number;
  addUsage: (usage: number) => Promise<void>;
  removeUsage: (index: number) => Promise<void>;
  hasExceeded: boolean;
  remainingUsage: number;
  unit: string;
  reset: () => Promise<void>;
  usages: SugarUsage[];
  restoreLastItem: () => Promise<boolean>;
}

const SugarUsageContext = createContext<SugarUsageContextType>(defaultValue);
export const useSugarUsageContext = () => useContext(SugarUsageContext);

const sugarUsageLimitPerWeek = 175;

const SugarUsageProvider: FC = ({ children }) => {
  const { storage } = useAsyncStorageContext();
  const [usages, setUsages] = useState<SugarUsage[]>([]);
  const [sugarUsageValue, setSugarUsage] = useState(0);
  const [percentUsage, setPercentUsage] = useState(0);
  const [hasExceeded, setHasExceeded] = useState(false);
  const [remainingUsage, setRemainingUsage] = useState(0);

  const service = useMemo(
    () =>
      new SugarUsageService({
        limitPerWeek: sugarUsageLimitPerWeek,
        storage,
        onChange: (usage, sugarService) => {
          setSugarUsage(usage);
          setHasExceeded(sugarService.hasExceededSugarUsageLimit);
          setPercentUsage(sugarService.sugarUsageInPercentage);
          setRemainingUsage(sugarService.remainingUsage);
          setUsages(service.usages);
        },
      }),
    [storage, setUsages],
  );

  const providerValue = useMemo<SugarUsageContextType>(
    () => ({
      sugarUsage: sugarUsageValue,
      percentUsage,
      addUsage: service.addUsage.bind(service),
      removeUsage: service.removeUsage.bind(service),
      hasExceeded,
      remainingUsage,
      unit: service.unit,
      reset: service.reset.bind(service),
      restoreLastItem: service.restoreLastItem.bind(service),
      usages,
    }),
    [
      hasExceeded,
      percentUsage,
      remainingUsage,
      service,
      sugarUsageValue,
      usages,
    ],
  );

  return (
    <SugarUsageContext.Provider value={providerValue}>
      {children}
    </SugarUsageContext.Provider>
  );
};

export default SugarUsageProvider;
