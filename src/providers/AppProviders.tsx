import React, { FC } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorageProvider } from './AsyncStorageProvider';
import { RecoilRoot } from 'recoil';

export interface AppProvidersProps {}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <PaperProvider>
        <AsyncStorageProvider>
          <NavigationContainer>{children}</NavigationContainer>
        </AsyncStorageProvider>
      </PaperProvider>
    </RecoilRoot>
  );
};
