import { readTextFileRowsSync } from "../common";
import { Board, DrawnNumbersAndBoards } from "./calculate-score";

const BoardDimension = 5;

export const readDrawnNumbersAndBoards = (
  path: string
): DrawnNumbersAndBoards => {
  const [drawnNumbersAsCSV, ...rows]: string[] = readTextFileRowsSync(path);

  const drawnNumbers: number[] = drawnNumbersAsCSV.split(",").map(Number);

  return {
    drawnNumbers,
    boards: mapRowsToBoards(rows),
  };
};

const mapRowsToBoards = (rows: string[]): Board[] => {
  return rows.filter((row) => row.length).reduce(reduceBoards, []);
};

const reduceBoards = (boards: Board[], rowAsString: string): Board[] => {
  const rowAsNumbers: number[] = mapRowAsStringToRowAsNumbers(rowAsString);

  if (!boards.length || boards[boards.length - 1].length === BoardDimension) {
    return [...boards, [rowAsNumbers]];
  } else {
    const lastBoardIndex: number = boards.length - 1;
    const lastBoard: Board = boards[lastBoardIndex];

    const nextBoards: Board[] = [...boards];
    nextBoards[lastBoardIndex] = [...lastBoard, rowAsNumbers];
    return nextBoards;
  }
};

const mapRowAsStringToRowAsNumbers = (row: string): number[] => {
  return row
    .split(" ")
    .filter((column) => column)
    .map(Number);
};
