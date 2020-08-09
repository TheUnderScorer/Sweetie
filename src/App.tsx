/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { CenteredSafeArea } from './ui/atoms/styles/view';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';
import { createStackNavigator } from '@react-navigation/stack';
import { SugarUsage } from './app/sugarUsage/SugarUsage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppProviders>
        <Stack.Navigator initialRouteName={AppRoutes.Home}>
          <Stack.Screen
            options={{
              title: 'Sweetie',
            }}
            component={SugarUsage}
            name={AppRoutes.Home}
          />
        </Stack.Navigator>
      </AppProviders>
    </>
  );
};

export default App;
