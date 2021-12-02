import * as path from "path";
import { readTextFileRowsSync } from "../common";

const InputFilePath = path.join(__dirname, "input.txt");

const inputRows: string[] = readTextFileRowsSync(InputFilePath);

interface State {
  aim: number;
  horizontalPosition: number;
  depth: number;
}

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

const { horizontalPosition, depth } = inputRows.reduce(positionReducer, {
  aim: 0,
  horizontalPosition: 0,
  depth: 0,
});

console.log(horizontalPosition * depth);
