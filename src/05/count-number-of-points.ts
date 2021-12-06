import { intRange } from "../common";

export const countNumberOfPoints = (
  rows: string[],
  greaterThanOrEqualTo: number
): number => {
  const vectors: Vector[] = mapRowsToVectors(rows);
  const map: number[][] = createMap(vectors);

  return map.flat().filter((point) => point >= greaterThanOrEqualTo).length;
};

interface Point {
  x: number;
  y: number;
}

interface Vector {
  from: Point;
  to: Point;
}

const mapRowsToVectors = (rows: string[]): Vector[] => {
  return rows.map((row) => {
    const groups = /^(\d+),(\d+) -> (\d+),(\d+)$/.exec(row)!;
    return {
      from: {
        x: Number(groups[1]),
        y: Number(groups[2]),
      },
      to: {
        x: Number(groups[3]),
        y: Number(groups[4]),
      },
    };
  });
};

const createMap = (vectors: Vector[]): number[][] => {
  const maxX: number = Math.max(
    ...vectors.flatMap((vector) => [vector.from.x, vector.to.y])
  );
  const maxY: number = Math.max(
    ...vectors.flatMap((vector) => [vector.from.y, vector.to.y])
  );

  const xLength = maxX + 1;
  const yLength = maxY + 1;

  const map: number[][] = Array(yLength)
    .fill(0)
    .map(() => Array(xLength).fill(0));

  vectors.forEach((vector) => addPointsToMap(map, vector));

  return map;
};

const addPointsToMap = (map: number[][], vector: Vector): void => {
  if (vector.from.x === vector.to.x) {
    const fromY = Math.min(vector.from.y, vector.to.y);
    const toY = Math.max(vector.from.y, vector.to.y);

    intRange(fromY, toY + 1).forEach((y) => {
      map[y][vector.from.x] += 1;
    });
  } else if (vector.from.y === vector.to.y) {
    const fromX = Math.min(vector.from.x, vector.to.x);
    const toX = Math.max(vector.from.x, vector.to.x);

    intRange(fromX, toX + 1).forEach((x) => {
      map[vector.from.y][x] += 1;
    });
  } else if (
    Math.abs(vector.from.x - vector.to.x) ===
    Math.abs(vector.from.y - vector.to.y)
  ) {
    const from: Point = vector.from.x < vector.to.x ? vector.from : vector.to;
    const to: Point = vector.from.x < vector.to.x ? vector.to : vector.from;

    if (from.y < to.y) {
      intRange(to.x - from.x + 1).forEach((delta) => {
        map[from.y + delta][from.x + delta] += 1;
      });
    } else {
      intRange(to.x - from.x + 1).forEach((delta) => {
        map[from.y - delta][from.x + delta] += 1;
      });
    }
  }
};
