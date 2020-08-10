import React from 'react';
import 'react-native-gesture-handler';
import { NativeModules, StatusBar } from 'react-native';
import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';
import { createStackNavigator } from '@react-navigation/stack';
import { SugarUsage } from './app/sugarUsage/SugarUsage';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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
