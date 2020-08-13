import React from 'react';
import 'react-native-gesture-handler';
import { NativeModules, YellowBox } from 'react-native';
import { AppProviders } from 'app/providers/AppProviders';
import { AppStackNavigator } from 'AppStackNavigator';
import { StatusBar } from 'ui/molecules/statusBar/StatusBar';

YellowBox.ignoreWarnings(['Setting a timer']);

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const App = () => {
  return (
    <>
      <AppProviders>
        <StatusBar />
        <AppStackNavigator />
      </AppProviders>
    </>
  );
};

export default App;
