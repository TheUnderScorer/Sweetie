import { StyleSheet } from 'react-native';
import { Theme } from 'react-native-paper/src/types';
import { useThemeContext } from 'app/providers/ThemeProvider';
import { useMemo } from 'react';

type StylesCreator<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
> = (theme: Theme) => T | StyleSheet.NamedStyles<T>;

export const makeStyles = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  stylesCreator: StylesCreator<T>,
) => () => {
  const { theme } = useThemeContext();

  return useMemo(() => StyleSheet.create(stylesCreator(theme)), [theme]);
};
