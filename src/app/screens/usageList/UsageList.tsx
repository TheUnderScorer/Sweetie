import React, { FC, useCallback } from 'react';
import { Colors, Portal, Snackbar, Title } from 'react-native-paper';
import { CenteredSurface } from 'ui/atoms/styles/view';
import { SafeAreaView, ScrollView } from 'react-native';
import { UsageListItem } from './usageListItem/UsageListItem';
import { useSugarUsageContext } from 'app/providers/SugarUsageProvider';
import useBooleanToggle from '../../../hooks/useBooleanToggle';
import { AddSugarUsage } from 'ui/molecules/addSugarUsageBtn/AddSugarUsage';
import { makeStyles } from 'styles/makeStyles';

export interface UsageListProps {}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  safeAreaView: {
    flex: 1,
  },
  addBtn: {
    marginTop: 10,
  },
}));

export const UsageList: FC<UsageListProps> = () => {
  const styles = useStyles();

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
      <CenteredSurface>
        <Title>No sugar usage in this week! 👍🏻</Title>
        <AddSugarUsage
          style={styles.addBtn}
          text="Add first usage"
          mode="text"
          isUnmountedOnAdd
        />
        {snackbar}
      </CenteredSurface>
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
