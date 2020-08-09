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
import { StatusBar } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { CenteredSafeArea } from './ui/atoms/styles/view';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PaperProvider>
        <CenteredSafeArea>
          <Button mode="contained" onPress={() => console.log('Pressed')}>
            Hello! 😀
          </Button>
        </CenteredSafeArea>
      </PaperProvider>
    </>
  );
};

export default App;
