import React, { FC, useMemo } from 'react';
import { SugarUsage } from '../../services/sugarUsage/types';
import { Avatar, Colors, IconButton, List, useTheme } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

export interface UsageListItemProps {
  usage: SugarUsage;
  onRemove: () => any;
  unit: string;
}

export const UsageListItem: FC<UsageListItemProps> = ({
  usage,
  onRemove,
  unit,
}) => {
  const date = useMemo(() => moment(usage.date).calendar(), [usage.date]);
  const theme = useTheme();

  return (
    <List.Item
      left={(props) => (
        <Avatar.Icon
          size={50}
          {...props}
          icon={(iconProps) => (
            <MaterialCommunityIcon
              {...iconProps}
              color={Colors.white}
              name="spoon-sugar"
            />
          )}
        />
      )}
      title={`${usage.amount}${unit}`}
      description={date}
      right={() => (
        <IconButton
          onPress={onRemove}
          color={theme.colors.error}
          icon={(props) => <MaterialIcon {...props} name="delete" />}
        />
      )}
    />
  );
};
