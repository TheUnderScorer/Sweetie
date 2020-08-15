import React, { FC } from 'react';
import { IconButton } from 'react-native-paper';
import { AppRoutes } from 'routes/AppRoutes';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import useNavigateTo from 'hooks/useNavigateTo';

export interface DetailsIconProps {}

export const DetailsIcon: FC<DetailsIconProps> = () => {
  const navigateTo = useNavigateTo();

  return (
    <IconButton
      onPress={navigateTo(AppRoutes.Details)}
      size={35}
      icon={(props) => <MaterialIcon {...props} name="format-list-bulleted" />}
    />
  );
};
