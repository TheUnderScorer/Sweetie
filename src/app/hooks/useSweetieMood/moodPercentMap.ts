import { MoodPercentUsageMap, SweetieMood } from './types';

export const moodPercentMap: MoodPercentUsageMap[] = [
  {
    mood: SweetieMood.Happy,
    condition: (percentUsage) => percentUsage <= 20,
  },
  {
    mood: SweetieMood.Neutral,
    condition: (percentUsage) => percentUsage > 20 && percentUsage <= 50,
  },
  {
    mood: SweetieMood.Puzzled,
    condition: (percentUsage) => percentUsage > 50 && percentUsage <= 80,
  },
  {
    mood: SweetieMood.Angry,
    condition: (percentUsage) => percentUsage > 80,
  },
];
