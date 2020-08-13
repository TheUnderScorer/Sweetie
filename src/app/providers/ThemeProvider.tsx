import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Theme } from 'react-native-paper/src/types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import useBooleanToggle from '../../hooks/useBooleanToggle';
import { useAsyncStorageContext } from './AsyncStorageProvider';

export interface ThemeProviderProps {}

const Context = createContext<ThemeProviderContext>({
  theme: {} as any,
  toggleDarkMode: () => {},
});

export const useThemeContext = () => useContext(Context);

export interface ThemeProviderContext {
  theme: Theme;
  toggleDarkMode: () => any;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { storage } = useAsyncStorageContext();
  const [dark, toggleDark, setDark] = useBooleanToggle(false);

  const context = useMemo<ThemeProviderContext>(() => {
    return {
      theme: {
        ...(dark ? DarkTheme : DefaultTheme),
        dark,
        mode: 'adaptive',
      },
      toggleDarkMode: toggleDark,
    };
  }, [dark, toggleDark]);

  useEffect(() => {
    storage.get('darkMode').then((value) => setDark(Boolean(value)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    storage.set('darkMode', dark).catch(console.error);
  }, [storage, dark]);

  return (
    <Context.Provider value={context}>
      <PaperProvider
        theme={context.theme}
        settings={{
          icon: (props) => <MaterialIcon {...props} />,
        }}>
        {children}
      </PaperProvider>
    </Context.Provider>
  );
};
