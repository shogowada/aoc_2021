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
    ...vectors.flatMap((vector) => [vector.from.x, vector.to.x])
  );
  const maxY: number = Math.max(
    ...vectors.flatMap((vector) => [vector.from.y, vector.to.y])
  );

  const xLength = maxX + 1;
  const yLength = maxY + 1;

  const points: Point[] = mapVectorsToPoints(vectors);

  const map: number[][] = Array(yLength)
    .fill(0)
    .map(() => Array(xLength).fill(0));

  points.forEach((point) => (map[point.y][point.x] += 1));

  return map;
};

const mapVectorsToPoints = (vectors: Vector[]): Point[] => {
  return vectors.flatMap(mapVectorToPoints);
};

const mapVectorToPoints = (vector: Vector): Point[] => {
  if (vector.from.x === vector.to.x) {
    const fromY = Math.min(vector.from.y, vector.to.y);
    const toY = Math.max(vector.from.y, vector.to.y);

    return intRange(fromY, toY + 1).map(
      (y): Point => ({ x: vector.from.x, y })
    );
  } else if (vector.from.y === vector.to.y) {
    const fromX = Math.min(vector.from.x, vector.to.x);
    const toX = Math.max(vector.from.x, vector.to.x);

    return intRange(fromX, toX + 1).map(
      (x): Point => ({ x, y: vector.from.y })
    );
  } else if (
    Math.abs(vector.from.x - vector.to.x) ===
    Math.abs(vector.from.y - vector.to.y)
  ) {
    const from: Point = vector.from.x < vector.to.x ? vector.from : vector.to;
    const to: Point = vector.from.x < vector.to.x ? vector.to : vector.from;

    return intRange(to.x - from.x + 1).map(
      (delta): Point => ({
        x: from.x + delta,
        y: from.y + (from.y < to.y ? delta : -delta),
      })
    );
  } else {
    return [];
  }
};
