import React, { FC, useCallback } from 'react';
import { Colors, Portal, Snackbar, Title } from 'react-native-paper';
import { CenteredSafeArea } from '../../../ui/atoms/styles/view';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { UsageListItem } from './usageListItem/UsageListItem';
import { useSugarUsageContext } from '../../providers/SugarUsageProvider';
import useBooleanToggle from '../../../hooks/useBooleanToggle';
import { AddSugarUsage } from '../../../ui/molecules/addSugarUsageBtn/AddSugarUsage';

export interface UsageListProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    marginBottom: 40,
  },
  addBtn: {
    marginTop: 10,
  },
});

export const UsageList: FC<UsageListProps> = () => {
  const { usages, unit, removeUsage, restoreLastItem } = useSugarUsageContext();
  const [removed, toggleRemoved, setRemoved] = useBooleanToggle(false);

  const handleRemove = useCallback(
    (index: number) => async () => {
      await removeUsage(index);
      setRemoved(true);
    },
    [removeUsage, setRemoved],
  );

  const snackbar = (
    <Snackbar
      style={{
        backgroundColor: Colors.green600,
      }}
      action={{ label: 'Undo', onPress: restoreLastItem }}
      onDismiss={toggleRemoved}
      visible={removed}>
      Sugar usage removed!
    </Snackbar>
  );

  if (!usages.length) {
    return (
      <CenteredSafeArea style={styles.centered}>
        <Title>No sugar usage in this week! 👍🏻</Title>
        <AddSugarUsage
          style={styles.addBtn}
          text="Add first usage"
          mode="text"
          isUnmountedOnAdd
        />
        {snackbar}
      </CenteredSafeArea>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Portal>{snackbar}</Portal>
      <ScrollView>
        {usages.map((usage, index) => (
          <UsageListItem
            onRemove={handleRemove(index)}
            unit={unit}
            usage={usage}
            key={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
