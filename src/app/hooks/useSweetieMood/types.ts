export enum SweetieMood {
  Happy,
  Neutral,
  Annoyed,
  Angry,
}

export interface MoodPercentUsageMap {
  mood: SweetieMood;
  condition: (percentUsage: number) => boolean;
}

export interface SweetieMoodResult {
  mood: SweetieMood;
  image: any;
  feel: SweetieFeel;
}

export interface SweetieFeel {
  title: string;
  subTitle: string;
}
