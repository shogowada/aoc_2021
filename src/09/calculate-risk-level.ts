const Highest = 9;

export const calculateRiskLevel = (rowsAsString: string[]): number => {
  const rows: number[][] = mapRowsAsStringToRows(rowsAsString);

  const lowPointHeights: number[] = extractLowPoints(rows).map((point) =>
    getHeight(rows, point)
  );

  return lowPointHeights.reduce((lhs, rhs) => lhs + rhs + 1, 0);
};

export const calculateMultiplyOfThreeLargestBasins = (
  rowsAsString: string[]
): number => {
  const rows: number[][] = mapRowsAsStringToRows(rowsAsString);

  const lowPoints: Point[] = extractLowPoints(rows);
  const basinSizesInDescendingOrder: number[] = lowPoints
    .map((point) => calculateBasinSize(rows, point))
    .sort((lhs, rhs) => rhs - lhs);

  return basinSizesInDescendingOrder
    .slice(0, 3)
    .reduce((multiply: number, basinSize: number): number => {
      return multiply * basinSize;
    });
};

const mapRowsAsStringToRows = (rowsAsString: string[]): number[][] => {
  return rowsAsString.map((rowAsString) => rowAsString.split("").map(Number));
};

interface Point {
  x: number;
  y: number;
}

const extractLowPoints = (rows: number[][]): Point[] => {
  return rows.flatMap((row, y: number): Point[] =>
    row
      .map((height: number, x: number): Point => ({ x, y }))
      .filter((point: Point) => isLowPoint(rows, point))
  );
};

const isLowPoint = (rows: number[][], point: Point): boolean => {
  return getAdjacentPoints(point).every((adjacentPoint) =>
    isLowerThan(rows, point, adjacentPoint)
  );
};

const isLowerThan = (
  rows: number[][],
  point: Point,
  comparedTo: Point
): boolean => {
  if (isPointOutOfBounds(rows, comparedTo)) {
    return true;
  } else {
    return getHeight(rows, point) < getHeight(rows, comparedTo);
  }
};

const calculateBasinSize = (
  rows: number[][],
  point: Point,
  visitedPoints: Point[] = []
): number => {
  const hasVisited: boolean = visitedPoints.some(
    (visitedPoint) => visitedPoint.x === point.x && visitedPoint.y === point.y
  );

  if (
    isPointOutOfBounds(rows, point) ||
    getHeight(rows, point) === Highest ||
    hasVisited
  ) {
    return 0;
  } else {
    visitedPoints.push(point);

    const nextPointsToVisit: Point[] = getAdjacentPoints(point);

    return nextPointsToVisit.reduce(
      (basinSize: number, nextPointToVisit: Point) => {
        return (
          basinSize + calculateBasinSize(rows, nextPointToVisit, visitedPoints)
        );
      },
      1
    );
  }
};

const getAdjacentPoints = (point: Point): Point[] => {
  return [
    { ...point, x: point.x - 1 },
    { ...point, x: point.x + 1 },
    { ...point, y: point.y - 1 },
    { ...point, y: point.y + 1 },
  ];
};

const isPointOutOfBounds = (rows: number[][], point: Point) => {
  return (
    point.y < 0 ||
    point.y >= rows.length ||
    point.x < 0 ||
    point.x >= rows[point.y].length
  );
};

const getHeight = (rows: number[][], point: Point): number => {
  return rows[point.y][point.x];
};
