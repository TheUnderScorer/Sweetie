import React, { FC, useCallback } from 'react';
import { SugarImg } from './sugarImg/SugarImg';
import { IconButton, Subheading, Title } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import useBooleanToggle from '../../../hooks/useBooleanToggle';

export interface SugarUsageDetailsProps {
  sugarUsage: number;
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
  sugarUsage,
  unit,
}) => {
  const [viewDetails, toggleViewDetails] = useBooleanToggle(false);

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
            Current usage: {sugarUsage}
            {unit}
          </Title>
          <Subheading style={styles.text}>
            Left: {remainingUsage}
            {unit}
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
