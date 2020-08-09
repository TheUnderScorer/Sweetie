export const percent = (value: number, total: number) => (value * 100) / total;

export const sum = (...numbers: number[]) => {
  return numbers.reduce((result, currentNumber) => result + currentNumber, 0);
};
