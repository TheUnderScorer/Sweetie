import { useCallback, useEffect, useMemo } from 'react';
import { useAsyncStorage } from './useAsyncStorage';
import { getEndOfWeek, isEndOfWeek, schedule } from '../utils/date';
import { DateFormats } from '../types/date';
import moment from 'moment';

interface EndOfWeekHookProps {
  callback: () => any;
  id: string;
}

export const useOnEndOfWeek = ({ callback, id }: EndOfWeekHookProps) => {
  const key = useMemo(() => `endOfWeekCallDate${id}`, [id]);

  const {
    value: lastCallDate,
    setValue: setLastCallDate,
    didFetch,
  } = useAsyncStorage<string>(key);

  const triggerCallback = useCallback(async () => {
    await callback();

    await setLastCallDate(moment().toISOString());
  }, [callback, setLastCallDate]);

  useEffect(() => {
    const endOfWeek = getEndOfWeek();

    const cancel = schedule(endOfWeek, triggerCallback);

    return () => {
      cancel();
    };
  }, [callback, triggerCallback]);

  useEffect(() => {
    if (!didFetch) {
      return;
    }

    if (!lastCallDate) {
      if (!isEndOfWeek()) {
        return;
      }

      triggerCallback().catch(console.error);
    }

    const now = moment();
    const lastCallDateMoment = moment();

    if (
      now.format(DateFormats.Date) ===
      lastCallDateMoment.format(DateFormats.Date)
    ) {
      return;
    }

    triggerCallback().catch(console.error);
  }, [lastCallDate, triggerCallback, didFetch]);

  return lastCallDate;
};
