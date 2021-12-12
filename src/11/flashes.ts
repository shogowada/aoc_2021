import { intRange } from "../common";

const Dimension = 10;

interface State {
  levels: number[][];
  totalFlashes: number;
}

export const countTotalFlashes = (rows: string[], steps: number): number => {
  const levels: number[][] = rows.map((row) => row.split("").map(Number));

  return intRange(steps).reduce(stateReducer, { levels, totalFlashes: 0 })
    .totalFlashes;
};

const stateReducer = ({ levels, totalFlashes }: State): State => {
  levels = addLevel(levels);

  while (true) {
    const flashes = flash(levels);
    if (flashes) {
      totalFlashes += flashes;
    } else {
      break;
    }
  }

  return {
    levels,
    totalFlashes,
  };
};

const addLevel = (levels: number[][]): number[][] => {
  return levels.map((levels) => levels.map((level) => level + 1));
};

const flash = (levels: number[][]): number => {
  let totalFlashes = 0;

  const addLevel = (y: number, x: number) => {
    if (
      y >= 0 &&
      y < Dimension &&
      x >= 0 &&
      x < Dimension &&
      levels[y][x] !== 0
    ) {
      levels[y][x] += 1;
    }
  };

  intRange(Dimension).forEach((y) => {
    intRange(Dimension).forEach((x) => {
      if (levels[y][x] > 9) {
        levels[y][x] = 0;
        ++totalFlashes;

        addLevel(y - 1, x - 1);
        addLevel(y - 1, x);
        addLevel(y - 1, x + 1);
        addLevel(y, x - 1);
        addLevel(y, x + 1);
        addLevel(y + 1, x - 1);
        addLevel(y + 1, x);
        addLevel(y + 1, x + 1);
      }
    });
  });

  return totalFlashes;
};
