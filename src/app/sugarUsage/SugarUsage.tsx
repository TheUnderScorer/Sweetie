import React, { FC, useMemo } from 'react';
import { CenteredSafeArea } from '../../ui/atoms/styles/view';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button, Subheading, Title, useTheme } from 'react-native-paper';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSugarUsage } from '../hooks/useSugarUsage';

export interface SugarUsageProps {}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
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
          <View>
            <Title style={styles.text}>
              Current usage: {sugarUsage}
              {unit}
            </Title>
            <Subheading style={styles.text}>
              Left: {remainingUsage}
              {unit}
            </Subheading>
          </View>
        )}
      </AnimatedCircularProgress>
      <Button mode="outlined">+</Button>
    </CenteredSafeArea>
  );
};
