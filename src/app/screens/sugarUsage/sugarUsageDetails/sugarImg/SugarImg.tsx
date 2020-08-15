import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSweetieMood } from 'app/hooks/useSweetieMood/useSweetieMood';

export interface SugarImgProps {}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 120,
  },
  sugarImgContainer: {
    alignItems: 'center',
  },
});

export const SugarImg: FC<SugarImgProps> = () => {
  const { image } = useSweetieMood();

  return (
    <View style={styles.sugarImgContainer}>
      <Image source={image} style={styles.img} />
    </View>
  );
};
