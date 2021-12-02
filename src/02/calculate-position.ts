export interface State {
  aim: number;
  horizontalPosition: number;
  depth: number;
}

export const calculatePosition = (rows: string[]): State => {
  return rows.reduce(positionReducer, {
    aim: 0,
    horizontalPosition: 0,
    depth: 0,
  });
};

const positionReducer = (
  { aim, horizontalPosition, depth }: State,
  row: string
): State => {
  const [all, direction, amountAsString] = /^([^\s]+) (.+)$/.exec(row)!;
  const amount = Number(amountAsString);
  switch (direction) {
    case "forward": {
      return {
        aim,
        horizontalPosition: horizontalPosition + amount,
        depth: depth + aim * amount,
      };
    }
    case "down": {
      return {
        aim: aim + amount,
        horizontalPosition,
        depth,
      };
    }
    case "up": {
      return {
        aim: aim - amount,
        horizontalPosition,
        depth,
      };
    }
    default: {
      throw new Error(`Unknown direction: ${direction}`);
    }
  }
};
