import { SweetieFeel, SweetieMood } from './types';

export const moodFeelMap: Record<SweetieMood, SweetieFeel> = {
  [SweetieMood.Happy]: {
    title: 'Sweetie is happy.',
    subTitle: 'Keep it up!',
  },
  [SweetieMood.Neutral]: {
    title: 'Sweetie is okay.',
    subTitle: 'Watch your sugar usage!',
  },
  [SweetieMood.Annoyed]: {
    title: 'Sweetie is annoyed.',
    subTitle: 'Stop eating so much sugar!',
  },
  [SweetieMood.Angry]: {
    title: 'Sweetie is angry.',
    subTitle: "You've eaten too much sugar in this week!",
  },
};
