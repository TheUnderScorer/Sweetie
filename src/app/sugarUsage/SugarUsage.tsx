import React, { FC, useMemo } from 'react';
import { CenteredSafeArea } from '../../ui/atoms/styles/view';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { IconButton, useTheme } from 'react-native-paper';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSugarUsage } from '../hooks/useSugarUsage';
import { AddSugarUsage } from '../addSugarUsageBtn/AddSugarUsage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SugarUsageDetails } from './sugarUsageDetails/SugarUsageDetails';

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
    addUsage,
    reset,
  } = useSugarUsage();

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
      <AddSugarUsage onAdd={addUsage} style={styles.addSugarBtn} />
      <IconButton
        onPress={reset}
        icon={(props) => <MaterialIcon {...props} name="refresh" />}
      />
    </CenteredSafeArea>
  );
};
