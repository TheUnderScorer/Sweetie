import React, { FC } from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { DetailsIcon } from './ui/atoms/detailsIcon/DetailsIcon';
import { SugarUsage } from './app/screens/sugarUsage/SugarUsage';
import { UsageList } from './app/screens/usageList/UsageList';
import { AppRoutes } from './routes/AppRoutes';
import { useTheme } from 'react-native-paper';
import { DarkModeSwitch } from './ui/molecules/darkModeSwitch/DarkModeSwitch';
import { Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

export const AppStackNavigator: FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerBackTitleStyle: {
          color: theme.colors.text,
        },
        headerBackImage: () => (
          <MaterialIcon size={30} color={theme.colors.text} name="arrow-back" />
        ),
        headerRight: () => <DarkModeSwitch />,
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
  );
};
