export enum SweetieMood {
  Happy,
  Neutral,
  Puzzled,
  Angry,
}

export type MoodPercentUsageMap = {
  mood: SweetieMood;
  condition: (percentUsage: number) => boolean;
};
