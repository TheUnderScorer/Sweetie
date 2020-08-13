import React, { FC } from 'react';
import { StatusBar as BaseStatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';

export interface StatusBarProps {}

export const StatusBar: FC<StatusBarProps> = () => {
  const theme = useTheme();

  return (
    <BaseStatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
  );
};
