import React, { FC, useMemo } from 'react';
import { CenteredSafeArea } from '../../../ui/atoms/styles/view';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Surface, useTheme } from 'react-native-paper';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { AddSugarUsage } from '../../../ui/molecules/addSugarUsageBtn/AddSugarUsage';
import { SugarUsageDetails } from './sugarUsageDetails/SugarUsageDetails';
import { useSugarUsageContext } from '../../providers/SugarUsageProvider';

export interface SugarUsageProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    justifyContent: 'space-between',
    marginTop: '25%',
    paddingBottom: 20,
  },
});

export const SugarUsage: FC<SugarUsageProps> = () => {
  const theme = useTheme();

  const dimensions = useWindowDimensions();
  const size = useMemo(() => dimensions.width / 1.2, [dimensions]);

  const {
    percentUsage,
    hasExceeded,
    sugarUsage,
    unit,
    remainingUsage,
    remainingUsagePerDay,
  } = useSugarUsageContext();

  return (
    <Surface style={styles.container}>
      <CenteredSafeArea style={styles.safeArea}>
        <AnimatedCircularProgress
          fill={percentUsage}
          size={size}
          width={30}
          tintColor={hasExceeded ? theme.colors.error : theme.colors.primary}
          backgroundColor={theme.colors.backdrop}>
          {() => (
            <SugarUsageDetails
              sugarUsage={sugarUsage}
              unit={unit}
              remainingUsage={remainingUsage}
              sugarUsagePerDay={remainingUsagePerDay}
            />
          )}
        </AnimatedCircularProgress>
        <AddSugarUsage />
      </CenteredSafeArea>
    </Surface>
  );
};
