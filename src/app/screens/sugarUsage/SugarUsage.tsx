import React, { FC, useMemo } from 'react';
import { CenteredSafeArea } from 'ui/atoms/styles/view';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Surface, useTheme, Headline, Subheading } from 'react-native-paper';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { AddSugarUsage } from 'ui/molecules/addSugarUsageBtn/AddSugarUsage';
import { SugarUsageDetails } from './sugarUsageDetails/SugarUsageDetails';
import { useSugarUsageContext } from 'app/providers/SugarUsageProvider';
import { useSweetieMood } from 'app/hooks/useSweetieMood/useSweetieMood';

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
  feel: {
    textAlign: 'center',
  },
});

export const SugarUsage: FC<SugarUsageProps> = () => {
  const theme = useTheme();

  const dimensions = useWindowDimensions();
  const size = useMemo(() => dimensions.width / 1.2, [dimensions]);

  const { feel } = useSweetieMood();

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
        <View>
          <Headline style={styles.feel}>{feel.title}</Headline>
          <Subheading style={styles.feel}>{feel.subTitle}</Subheading>
        </View>
        <AddSugarUsage />
      </CenteredSafeArea>
    </Surface>
  );
};
