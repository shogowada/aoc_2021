import { intRange } from "../common";

const NumberOfDaysToReproduceForNewborn = 8;
const NumberOfDaysToReproduceForAdult = 6;

export const predictLanternfishCount = (
  initialDaysToReproduce: number[],
  numberOfDays: number
): number => {
  let countByIndex: number[] = Array(
    NumberOfDaysToReproduceForNewborn + 1
  ).fill(0);
  initialDaysToReproduce.forEach((days) => {
    countByIndex[days] += 1;
  });
  intRange(numberOfDays).forEach(() => {
    countByIndex = daysToReproduceReducer(countByIndex);
  });
  return Object.values(countByIndex).reduce((lhs, rhs) => lhs + rhs, 0);
};

const daysToReproduceReducer = (countByIndex: number[]): number[] => {
  const aboutToBareCount: number = countByIndex[0];

  intRange(NumberOfDaysToReproduceForNewborn + 1).forEach((days) => {
    if (days + 1 < countByIndex.length) {
      countByIndex[days] = countByIndex[days + 1];
    }
  });

  countByIndex[NumberOfDaysToReproduceForNewborn] = aboutToBareCount;
  countByIndex[NumberOfDaysToReproduceForAdult] += aboutToBareCount;

  return countByIndex;
};
