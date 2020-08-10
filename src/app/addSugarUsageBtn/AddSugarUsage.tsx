import React, { FC, useCallback, useEffect } from 'react';
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TextInput,
  useTheme,
} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import useBooleanToggle from '../../hooks/useBooleanToggle';
import { useNumericField } from '../../hooks/useNumericField';

export interface AddSugarUsageProps {
  style?: StyleProp<ViewStyle>;
  onAdd: (usage: number) => any;
}

const styles = StyleSheet.create({
  cancel: {
    marginRight: 10,
  },
});

export const AddSugarUsage: FC<AddSugarUsageProps> = ({ style, onAdd }) => {
  const theme = useTheme();

  const [amount, handleAmountChange, setAmount] = useNumericField(0);
  const [visible, toggleVisible] = useBooleanToggle(false);

  const handleAdd = useCallback(() => {
    if (amount) {
      onAdd(amount as number);
    }

    toggleVisible();
  }, [amount, toggleVisible, onAdd]);

  useEffect(() => {
    if (!visible) {
      setAmount(null);
    }
  }, [visible, setAmount]);

  return (
    <View style={style}>
      <IconButton
        size={40}
        style={{
          backgroundColor: theme.colors.primary,
          ...(style as object),
        }}
        color="white"
        onPress={toggleVisible}
        icon={(props) => <MaterialIcon {...props} name="add" />}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={toggleVisible}>
          <Dialog.Title>Add sugar usage</Dialog.Title>
          <Dialog.Content>
            <TextInput
              right={<TextInput.Affix text="g" />}
              value={amount?.toString()}
              onChangeText={handleAmountChange}
              label="Sugar usage"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.cancel} onPress={toggleVisible}>
              Cancel
            </Button>
            <Button onPress={handleAdd} disabled={!amount} mode="contained">
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
