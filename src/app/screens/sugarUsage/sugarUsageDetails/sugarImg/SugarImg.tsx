import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Sugar from '../../../../../assets/sugar.png';

export interface SugarImgProps {}

const styles = StyleSheet.create({
  img: {
    width: 125,
    height: 75,
  },
  sugarImgContainer: {
    alignItems: 'center',
  },
});

export const SugarImg: FC<SugarImgProps> = () => {
  return (
    <View style={styles.sugarImgContainer}>
      <Image source={Sugar} style={styles.img} />
    </View>
  );
};
