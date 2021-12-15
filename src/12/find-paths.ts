import { isNonNull } from "../common";

interface Connection {
  a: string;
  b: string;
}

const Start = "start";
const End = "end";

type Path = string[];

export const countPaths = (rows: string[]): number => {
  const connections: Connection[] = rows.map(mapRowToConnection);

  const paths: Path[] = findPaths(connections, []).filter((path) => {
    const lastCave = path[path.length - 1];
    return lastCave === End;
  });

  return paths.length;
};

const mapRowToConnection = (row: string): Connection => {
  const [a, b] = row.split("-");
  return { a, b };
};

const findPaths = (connections: Connection[], prevPath: Path): Path[] => {
  if (!prevPath.length) {
    return findPaths(connections, [Start]);
  } else {
    const lastCave: string = prevPath[prevPath.length - 1];
    if (lastCave === End) {
      return [prevPath];
    } else if (lastCave === Start && prevPath.length !== 1) {
      return [prevPath];
    }

    const nextCaves: string[] = findNextCaves(connections, prevPath);
    return nextCaves.flatMap((nextCave) =>
      findPaths(connections, [...prevPath, nextCave])
    );
  }
};

const findNextCaves = (connections: Connection[], prevPath: Path): string[] => {
  const lastCave = prevPath[prevPath.length - 1];

  const visitedSmallCaves: string[] = prevPath.filter(isSmallCave);

  const smallCaveToVisitedCountDictionary: Record<string, number> = prevPath
    .filter(isSmallCave)
    .reduce(
      (
        smallCaveToVisitedCountDictionary: Record<string, number>,
        smallCave: string
      ) => {
        return {
          ...smallCaveToVisitedCountDictionary,
          [smallCave]: (smallCaveToVisitedCountDictionary[smallCave] || 0) + 1,
        };
      },
      {}
    );

  const hasVisitedAnySmallCaveTwice: boolean = Object.values(
    smallCaveToVisitedCountDictionary
  ).some((count) => count >= 2);

  return connections
    .map((connection) => {
      if (connection.a === lastCave) {
        return connection.b;
      } else if (connection.b === lastCave) {
        return connection.a;
      } else {
        return null;
      }
    })
    .filter(isNonNull)
    .filter((cave) => {
      if (hasVisitedAnySmallCaveTwice) {
        return !visitedSmallCaves.includes(cave);
      } else {
        return true;
      }
    });
};

const isSmallCave = (cave: string): cave is Lowercase<string> =>
  cave.toLowerCase() === cave;
