import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useAsyncStorageContext } from './AsyncStorageProvider';
import { SugarUsage } from '../services/sugarUsage/types';
import { SugarUsageService } from '../services/sugarUsage/SugarUsageService';
import { useOnEndOfWeek } from '../../hooks/useOnEndOfWeek';

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
  remainingUsagePerDay: 0,
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
  remainingUsagePerDay: number;
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
  const [remainingUsagePerDay, setRemainingUsagePerDay] = useState(0);

  const onChange = useCallback(
    (usage: number, sugarService: SugarUsageService) => {
      setSugarUsage(usage);
      setHasExceeded(sugarService.hasExceededSugarUsageLimit);
      setPercentUsage(sugarService.sugarUsageInPercentage);
      setRemainingUsage(sugarService.remainingUsage);
      setUsages(sugarService.usages);
      setRemainingUsagePerDay(sugarService.remainingUsagePerDay);
    },
    [],
  );

  const service = useMemo(
    () =>
      new SugarUsageService({
        limitPerWeek: sugarUsageLimitPerWeek,
        storage,
        onChange,
      }),
    [storage, onChange],
  );

  const reset = useCallback(async () => {
    await service.reset();
  }, [service]);

  useOnEndOfWeek({
    id: 'sugarUsageCleanup',
    callback: reset,
  });

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
      remainingUsagePerDay,
    }),
    [
      hasExceeded,
      percentUsage,
      remainingUsage,
      remainingUsagePerDay,
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
