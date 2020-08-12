import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

const useNavigateTo = () => {
  const navigation = useNavigation();

  return useCallback(
    (screen: string) => () => {
      navigation.navigate(screen);
    },
    [navigation],
  );
};

export default useNavigateTo;
