import { useCallback, useState } from 'react';

type Value = number | null;

export const useNumericField = (
  initialValue: Value = null,
): [Value, (value: string) => any, (value: Value) => any] => {
  const [value, setValue] = useState<Value>(null);

  const handleChange = useCallback(
    (inputValue: string) => {
      const parsed = parseInt(inputValue, 10);

      setValue(Number.isNaN(parsed) ? initialValue : parsed);
    },
    [initialValue],
  );

  return [value, handleChange, setValue];
};
