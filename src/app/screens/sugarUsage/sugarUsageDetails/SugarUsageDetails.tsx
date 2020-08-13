import React, { FC, useCallback, useMemo } from 'react';
import { SugarImg } from './sugarImg/SugarImg';
import { IconButton, Subheading, Title, useTheme } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import useBooleanToggle from '../../../../hooks/useBooleanToggle';
import { getRemainingDaysInWeek } from '../../../../utils/date';

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
    <View testID="sugar-details" style={styles.detailsContainer}>
      {!viewDetails && <SugarImg />}
      {viewDetails && (
        <>
          <Title testID="current-usage" style={styles.text}>
            Current usage:{' '}
            <Title
              testID="current-usage-value"
              style={{
                color: remainingUsage ? theme.colors.text : theme.colors.error,
              }}>
              {sugarUsage}
              {unit}
            </Title>
          </Title>
          <Subheading testID="remaining-usage" style={styles.text}>
            Left: {remainingUsage}
            {unit}
          </Subheading>
          <Subheading testID="left-per-day" style={styles.text}>
            Left per day: {sugarUsagePerDay.toFixed(2)}
            {unit}
          </Subheading>
          <Subheading testID="remaining-days" style={styles.text}>
            Remaining days: {remainingDays}
          </Subheading>
        </>
      )}
      <IconButton
        testID="toggle-details"
        style={styles.toggleIcon}
        onPress={handleToggle}
        size={45}
        icon={(props) => <MaterialIcon {...props} name="more-horiz" />}
      />
    </View>
  );
};
