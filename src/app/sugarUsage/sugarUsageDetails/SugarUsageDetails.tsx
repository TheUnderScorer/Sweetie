import React, { FC, useCallback, useMemo } from 'react';
import { SugarImg } from './sugarImg/SugarImg';
import {
  IconButton,
  Subheading,
  Title,
  Divider,
  useTheme,
} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import useBooleanToggle from '../../../hooks/useBooleanToggle';
import { getRemainingDaysInWeek } from '../../../utils/date';

export interface SugarUsageDetailsProps {
  sugarUsage: number;
  sugarUsagePerDay: number;
  unit: string;
  remainingUsage: number;
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  addSugarBtn: {
    marginTop: 50,
  },
  detailsContainer: {
    alignItems: 'center',
    top: 10,
  },
  toggleIcon: {
    marginTop: 10,
  },
});

export const SugarUsageDetails: FC<SugarUsageDetailsProps> = ({
  remainingUsage,
  sugarUsagePerDay,
  sugarUsage,
  unit,
}) => {
  const theme = useTheme();

  const [viewDetails, toggleViewDetails] = useBooleanToggle(false);
  const remainingDays = useMemo(() => getRemainingDaysInWeek(), []);

  const handleToggle = useCallback(() => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 250,
    });

    toggleViewDetails();
  }, [toggleViewDetails]);

  return (
    <View style={styles.detailsContainer}>
      {!viewDetails && <SugarImg />}
      {viewDetails && (
        <>
          <Title style={styles.text}>
            Current usage:{' '}
            <Title
              style={{
                color: remainingUsage ? theme.colors.text : theme.colors.error,
              }}>
              {sugarUsage}
              {unit}
            </Title>
          </Title>
          <Subheading style={styles.text}>
            Left: {remainingUsage}
            {unit}
          </Subheading>

          <Subheading style={styles.text}>
            Left per day: {sugarUsagePerDay}
            {unit}
          </Subheading>
          <Subheading style={styles.text}>
            Remaining days: {remainingDays}
          </Subheading>
        </>
      )}
      <IconButton
        style={styles.toggleIcon}
        onPress={handleToggle}
        size={45}
        icon={(props) => <MaterialIcon {...props} name="more-horiz" />}
      />
    </View>
  );
};
