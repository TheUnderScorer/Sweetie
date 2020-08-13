import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorageProvider } from './AsyncStorageProvider';
import SugarUsageProvider from './SugarUsageProvider';
import { ThemeProvider } from './ThemeProvider';

export interface AppProvidersProps {}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <AsyncStorageProvider>
      <ThemeProvider>
        <NavigationContainer>
          <SugarUsageProvider>{children}</SugarUsageProvider>
        </NavigationContainer>
      </ThemeProvider>
    </AsyncStorageProvider>
  );
};
