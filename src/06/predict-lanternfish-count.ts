import { intRange } from "../common";

const NumberOfDaysToReproduceForNewborn = 8;
const NumberOfDaysToReproduceForAdult = 6;

export const predictLanternfishCount = (
  initialDaysToReproduce: number[],
  numberOfDays: number
): number => {
  return intRange(numberOfDays).reduce(
    daysToReproduceReducer,
    initialDaysToReproduce
  ).length;
};

const daysToReproduceReducer = (daysToReproduce: number[]): number[] => {
  const aboutToBare: number[] = [];
  const noChange: number[] = [];
  daysToReproduce.forEach((daysToReproduce) => {
    if (daysToReproduce) {
      noChange.push(daysToReproduce);
    } else {
      aboutToBare.push(daysToReproduce);
    }
  });

  return [
    ...noChange.map((daysToReproduce) => daysToReproduce - 1),
    ...Array(aboutToBare.length).fill(NumberOfDaysToReproduceForAdult),
    ...Array(aboutToBare.length).fill(NumberOfDaysToReproduceForNewborn),
  ];
};
