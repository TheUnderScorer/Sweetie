import { useEffect, useMemo, useState } from 'react';
import { useSugarUsageContext } from 'app/providers/SugarUsageProvider';
import { SweetieMood, SweetieMoodResult } from './types';
import { moodPercentMap } from './moodPercentMap';
import { moodImageMap } from 'app/hooks/useSweetieMood/moodImageMap';
import { moodFeelMap } from 'app/hooks/useSweetieMood/moodFeelMap';

export const useSweetieMood = (): SweetieMoodResult => {
  const { percentUsage } = useSugarUsageContext();
  const [mood, setMood] = useState<SweetieMood>(SweetieMood.Neutral);

  useEffect(() => {
    for (const { condition, mood: targetMood } of moodPercentMap) {
      if (condition(percentUsage)) {
        setMood(targetMood);

        break;
      }
    }
  }, [percentUsage]);

  return useMemo(
    () => ({
      mood,
      image: moodImageMap[mood],
      feel: moodFeelMap[mood],
    }),
    [mood],
  );
};
