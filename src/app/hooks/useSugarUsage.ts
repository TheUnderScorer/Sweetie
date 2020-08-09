import { useMemo } from 'react';
import { sugarUsage } from '../../state/atoms/sugarUsage';
import { createSugarUsageService } from '../services/sugarUsage/sugarUsageService';
import { useAsyncStorageContext } from '../../providers/AsyncStorageProvider';
import { useRecoilState } from 'recoil';

const sugarUsageLimitPerWeek = 175;

export const useSugarUsage = () => {
  const { storage } = useAsyncStorageContext();
  const service = createSugarUsageService(sugarUsageLimitPerWeek, storage);

  const [sugarUsageValue, setSugarUsage] = useRecoilState(sugarUsage);
  service.onChange(setSugarUsage);

  const percentUsage = useMemo(() => service.getSugarUsageInPercentage(), [
    service,
  ]);

  const hasExceeded = useMemo(() => service.hasExceededSugarUsageLimit(), [
    service,
  ]);

  const remainingUsage = useMemo(() => service.getRemainingUsage(), [service]);

  return {
    sugarUsage: sugarUsageValue,
    percentUsage,
    addUsage: service.addUsage,
    hasExceeded,
    remainingUsage,
    unit: service.unit,
  };
};
