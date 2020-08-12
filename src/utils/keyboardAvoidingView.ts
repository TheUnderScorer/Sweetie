import { Platform } from 'react-native';

export const getBehavior = () =>
  Platform.OS === 'ios' ? 'position' : 'padding';
