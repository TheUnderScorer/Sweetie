import { SweetieMood } from 'app/hooks/useSweetieMood/types';
import Angry from 'assets/moods/sweetie-angry.png';
import Annoyed from 'assets/moods/sweetie-annoyed.png';
import Happy from 'assets/moods/sweetie-happy.png';
import Neutral from 'assets/moods/sweetie-neutral.png';

export const moodImageMap: Record<SweetieMood, any> = {
  [SweetieMood.Happy]: Happy,
  [SweetieMood.Neutral]: Neutral,
  [SweetieMood.Annoyed]: Annoyed,
  [SweetieMood.Angry]: Angry,
};
