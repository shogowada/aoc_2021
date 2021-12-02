interface Result {
  count: number;
  prev: number | null;
}

export const countNumberOfTimesIncreased = (values: number[]): number => {
  return values.reduce(resultReducer, { count: 0, prev: null }).count;
};

const resultReducer = ({ count, prev }: Result, value: number): Result => {
  if (prev === null || value <= prev) {
    return {
      count,
      prev: value,
    };
  } else {
    return {
      count: count + 1,
      prev: value,
    };
  }
};
