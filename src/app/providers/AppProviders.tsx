import React, { FC } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorageProvider } from './AsyncStorageProvider';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SugarUsageProvider from './SugarUsageProvider';

export interface AppProvidersProps {}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <AsyncStorageProvider>
      <PaperProvider
        settings={{
          icon: (props) => <MaterialIcon {...props} />,
        }}>
        <NavigationContainer>
          <SugarUsageProvider>{children}</SugarUsageProvider>
        </NavigationContainer>
      </PaperProvider>
    </AsyncStorageProvider>
  );
};
