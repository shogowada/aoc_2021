export interface IntRange {
  (count: number): number[];
  (start: number, end: number): number[];
}

export const intRange: IntRange = (start: number, end?: number): number[] => {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return Array(end - start)
    .fill(0)
    .map((value, index) => start + index);
};
