interface Connection {
  a: string;
  b: string;
}

const Start = "start";
const End = "end";

type Path = string[];

export const countPaths = (rows: string[]): number => {
  const connections: Connection[] = rows.map(mapRowToConnection);

  const paths: Path[] = findCompletePaths(connections);

  return paths.length;
};

const mapRowToConnection = (row: string): Connection => {
  const [a, b] = row.split("-");
  return { a, b };
};

const findCompletePaths = (connections: Connection[]): Path[] => {
  return findPaths(connections).filter(isCompletePath);
};

const findPaths = (
  connections: Connection[],
  prevPath: Path = [Start]
): Path[] => {
  const lastCave: string = prevPath[prevPath.length - 1];
  if (lastCave === End) {
    return [prevPath];
  }

  const nextCaves: string[] = findNextCaves(connections, prevPath);
  return nextCaves.flatMap((nextCave) =>
    findPaths(connections, [...prevPath, nextCave])
  );
};

const findNextCaves = (connections: Connection[], prevPath: Path): string[] => {
  const lastCave = prevPath[prevPath.length - 1];

  const smallCaveToVisitedCountDictionary: Record<string, number> =
    mapPathToSmallCaveToVisitedCountDictionary(prevPath);

  const hasVisitedAnySmallCaveTwice: boolean = Object.values(
    smallCaveToVisitedCountDictionary
  ).some((count) => count >= 2);

  const mapConnectionToNextCave = (connection: Connection): string | null => {
    if (connection.a === lastCave) {
      return connection.b;
    } else if (connection.b === lastCave) {
      return connection.a;
    } else {
      return null;
    }
  };

  const canVisit = (cave: string | null): cave is string => {
    if (!cave || cave === Start) {
      return false;
    } else if (hasVisitedAnySmallCaveTwice) {
      return !smallCaveToVisitedCountDictionary[cave];
    } else {
      return true;
    }
  };

  return connections.map(mapConnectionToNextCave).filter(canVisit);
};

const mapPathToSmallCaveToVisitedCountDictionary = (
  path: Path
): Record<string, number> => {
  return path.filter(isSmallCave).reduce(
    (
      smallCaveToVisitedCountDictionary: Record<string, number>,
      smallCave: string
    ) => ({
      ...smallCaveToVisitedCountDictionary,
      [smallCave]: (smallCaveToVisitedCountDictionary[smallCave] || 0) + 1,
    }),
    {}
  );
};

const isSmallCave = (cave: string): cave is Lowercase<string> =>
  cave.toLowerCase() === cave;

const isCompletePath = (path: Path): boolean => {
  const lastCave: string = path[path.length - 1];
  return lastCave === End;
};
