export const intRange = (count: number): number[] => {
  return Array(count)
    .fill(0)
    .map((value, index) => index);
};
