export const tryParseJson = (value: any) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
