import React, { FC } from 'react';
import { useThemeContext } from '../../../app/providers/ThemeProvider';
import { Switch } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export interface DarkModeSwitchProps {}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 110,
  },
});

export const DarkModeSwitch: FC<DarkModeSwitchProps> = () => {
  const { toggleDarkMode, theme } = useThemeContext();

  return (
    <View style={styles.view}>
      <FeatherIcon
        onPress={toggleDarkMode}
        color={theme.colors.text}
        size={20}
        name="sun"
      />
      <Switch value={theme.dark} onValueChange={() => toggleDarkMode()} />
      <FeatherIcon
        onPress={toggleDarkMode}
        color={theme.colors.text}
        size={20}
        name="moon"
      />
    </View>
  );
};
