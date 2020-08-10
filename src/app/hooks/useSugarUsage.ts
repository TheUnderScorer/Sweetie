import { useMemo, useState } from 'react';
import { SugarUsageService } from '../services/sugarUsage/SugarUsageService';
import { useAsyncStorageContext } from '../../providers/AsyncStorageProvider';

const sugarUsageLimitPerWeek = 175;

export const useSugarUsage = () => {
  const { storage } = useAsyncStorageContext();
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
        },
      }),
    [storage],
  );

  return {
    sugarUsage: sugarUsageValue,
    percentUsage,
    addUsage: service.addUsage.bind(service),
    hasExceeded,
    remainingUsage,
    unit: service.unit,
    reset: service.reset.bind(service),
  };
};
