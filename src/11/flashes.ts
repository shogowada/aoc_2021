import { intRange } from "../common";

const Dimension = 10;

interface State {
  levels: number[][];
  totalFlashes: number;
}

export const countTotalFlashes = (rows: string[], steps: number): number => {
  const levels: number[][] = mapRowsToLevels(rows);

  return intRange(steps).reduce(stateReducer, { levels, totalFlashes: 0 })
    .totalFlashes;
};

export const countStepsToSimultaneousFlash = (rows: string[]): number => {
  const levels: number[][] = mapRowsToLevels(rows);

  let state: State = { levels, totalFlashes: 0 };
  let prevState: State | undefined;

  let steps = 0;
  while (true) {
    state = stateReducer(state);
    ++steps;

    if (
      state.totalFlashes - (prevState?.totalFlashes || 0) ===
      Dimension * Dimension
    ) {
      return steps;
    }

    prevState = state;
  }
};

const mapRowsToLevels = (rows: string[]): number[][] => {
  return rows.map((row) => row.split("").map(Number));
};

const stateReducer = ({ levels, totalFlashes }: State): State => {
  levels = addLevel(levels);

  let flashes: number;
  while ((flashes = flash(levels))) {
    totalFlashes += flashes;
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
