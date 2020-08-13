import React from 'react';
import 'react-native-gesture-handler';
import { NativeModules, YellowBox } from 'react-native';
import { AppProviders } from './app/providers/AppProviders';
import { AppRoutes } from './routes/AppRoutes';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { SugarUsage } from './app/sugarUsage/SugarUsage';
import { DetailsIcon } from './ui/atoms/detailsIcon/DetailsIcon';
import { UsageList } from './app/usageList/UsageList';

YellowBox.ignoreWarnings(['Setting a timer']);

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <AppProviders>
        <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
          initialRouteName={AppRoutes.Home}>
          <Stack.Screen
            options={{
              title: '',
              headerTransparent: true,
              headerLeft: () => <DetailsIcon />,
            }}
            component={SugarUsage}
            name={AppRoutes.Home}
          />
          <Stack.Screen name={AppRoutes.Details} component={UsageList} />
        </Stack.Navigator>
      </AppProviders>
    </>
  );
};

export default App;
