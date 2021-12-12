export const calculateRiskLevel = (rowsAsString: string[]): number => {
  const rows: number[][] = rowsAsString.map((rowAsString) =>
    rowAsString.split("").map(Number)
  );

  const lowPoints: number[] = rows.flatMap((row, y: number) =>
    row.filter((height: number, x: number) => isLowPoint(rows, { x, y }))
  );

  return lowPoints.reduce((lhs, rhs) => lhs + rhs + 1, 0);
};

interface Point {
  x: number;
  y: number;
}

const isLowPoint = (rows: number[][], point: Point): boolean => {
  return (
    isLowerThan(rows, point, { ...point, x: point.x - 1 }) &&
    isLowerThan(rows, point, { ...point, x: point.x + 1 }) &&
    isLowerThan(rows, point, { ...point, y: point.y - 1 }) &&
    isLowerThan(rows, point, { ...point, y: point.y + 1 })
  );
};

const isLowerThan = (
  rows: number[][],
  point: Point,
  comparedTo: Point
): boolean => {
  if (
    comparedTo.y < 0 ||
    comparedTo.y >= rows.length ||
    comparedTo.x < 0 ||
    comparedTo.x >= rows[comparedTo.y].length
  ) {
    return true;
  } else {
    return rows[point.y][point.x] < rows[comparedTo.y][comparedTo.x];
  }
};
