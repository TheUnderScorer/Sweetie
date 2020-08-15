import { useEffect, useState } from 'react';
import { useSugarUsageContext } from 'app/providers/SugarUsageProvider';
import { SweetieMood } from './types';
import { moodPercentMap } from './moodPercentMap';

export const useSweetieMood = () => {
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

  return mood;
};
