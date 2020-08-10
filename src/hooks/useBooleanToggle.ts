import { useCallback, useState } from 'react';

const useBooleanToggle = (
  initialValue: boolean = false,
): [boolean, () => any, (value: boolean) => any] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(!value);
  }, [value]);

  return [value, toggle, setValue];
};

export default useBooleanToggle;
