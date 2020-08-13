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
import useBooleanToggle from '../../../hooks/useBooleanToggle';
import { useNumericField } from '../../../hooks/useNumericField';
import { useSugarUsageContext } from '../../../app/providers/SugarUsageProvider';

export interface AddSugarUsageProps {
  style?: StyleProp<ViewStyle>;
  isUnmountedOnAdd?: boolean;
  mode?: 'icon' | 'text';
  text?: string;
}

const styles = StyleSheet.create({
  cancel: {
    marginRight: 10,
  },
  button: {
    paddingVertical: 4,
  },
});

export const AddSugarUsage: FC<AddSugarUsageProps> = ({
  style,
  isUnmountedOnAdd,
  mode = 'icon',
  text = 'Add usage',
}) => {
  const theme = useTheme();

  const { addUsage } = useSugarUsageContext();

  const [amount, handleAmountChange, setAmount] = useNumericField(0);
  const [visible, toggleVisible] = useBooleanToggle(false);

  const handleAdd = useCallback(async () => {
    if (amount) {
      await addUsage(amount);
    }

    if (!isUnmountedOnAdd) {
      toggleVisible();
    }
  }, [amount, toggleVisible, addUsage, isUnmountedOnAdd]);

  useEffect(() => {
    if (!visible) {
      setAmount(null);
    }
  }, [visible, setAmount]);

  return (
    <View style={style}>
      {mode === 'icon' && (
        <IconButton
          testID="add-sugar-usage"
          size={45}
          style={{
            backgroundColor: theme.colors.primary,
            ...(style as object),
          }}
          color="white"
          onPress={toggleVisible}
          icon={(props) => <MaterialIcon {...props} size={35} name="add" />}
        />
      )}
      {mode === 'text' && (
        <Button
          style={styles.button}
          loading={visible}
          icon={(props) => <MaterialIcon {...props} size={35} name="add" />}
          testID="add-sugar-usage"
          onPress={toggleVisible}
          mode="contained">
          {text}
        </Button>
      )}
      <Portal>
        <Dialog visible={visible} onDismiss={toggleVisible}>
          <Dialog.Title>Add sugar usage</Dialog.Title>
          <Dialog.Content>
            <TextInput
              testID="sugar-usage-value"
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
            <Button
              testID="save-usage"
              onPress={handleAdd}
              disabled={!amount}
              mode="contained">
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
