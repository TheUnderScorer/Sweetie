import React, { FC, useMemo } from 'react';
import { CenteredSafeArea } from '../../ui/atoms/styles/view';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTheme } from 'react-native-paper';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { AddSugarUsage } from '../addSugarUsageBtn/AddSugarUsage';
import { SugarUsageDetails } from './sugarUsageDetails/SugarUsageDetails';
import { useSugarUsageContext } from '../providers/SugarUsageProvider';

export interface SugarUsageProps {}

const styles = StyleSheet.create({
  addSugarBtn: {
    marginTop: 50,
  },
});

export const SugarUsage: FC<SugarUsageProps> = () => {
  const {
    colors: { primary, surface, error },
  } = useTheme();

  const dimensions = useWindowDimensions();
  const size = useMemo(() => dimensions.width / 1.2, [dimensions]);

  const {
    percentUsage,
    hasExceeded,
    sugarUsage,
    unit,
    remainingUsage,
  } = useSugarUsageContext();

  return (
    <CenteredSafeArea>
      <AnimatedCircularProgress
        fill={percentUsage}
        size={size}
        width={30}
        tintColor={hasExceeded ? error : primary}
        backgroundColor={surface}>
        {() => (
          <SugarUsageDetails
            sugarUsage={sugarUsage}
            unit={unit}
            remainingUsage={remainingUsage}
          />
        )}
      </AnimatedCircularProgress>
      <AddSugarUsage style={styles.addSugarBtn} />
    </CenteredSafeArea>
  );
};
