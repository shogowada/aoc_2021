import { intRange } from "../common";

export const calculateNecessaryFuel = (positions: number[]): number => {
  const maxPosition: number = Math.max(...positions);

  const necessaryFuels: number[] = intRange(maxPosition).map((position) =>
    calculateNecessaryFuelToAlignTo(positions, position)
  );

  return Math.min(...necessaryFuels);
};

const calculateNecessaryFuelToAlignTo = (
  positions: number[],
  positionToAlignTo: number
): number => {
  return positions.reduce((necessaryFuel: number, position) => {
    return necessaryFuel + Math.abs(position - positionToAlignTo);
  }, 0);
};
