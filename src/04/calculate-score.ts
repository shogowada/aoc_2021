import { intRange, isNonNull } from "../common";

export type Board = number[][];

export interface DrawnNumbersAndBoards {
  drawnNumbers: number[];
  boards: Board[];
}

export const calculateLastWinnerScore = (
  drawnNumbersAndBoards: DrawnNumbersAndBoards
): number => {
  const winnerBoards: WinnerBoard[] = mapToWinnerBoardsInWonOrder(
    drawnNumbersAndBoards
  );
  return mapWinnerBoardToScore(winnerBoards[winnerBoards.length - 1]);
};

export const calculateFirstWinnerScore = (
  drawnNumbersAndBoards: DrawnNumbersAndBoards
): number => {
  const winnerBoards: WinnerBoard[] = mapToWinnerBoardsInWonOrder(
    drawnNumbersAndBoards
  );
  return mapWinnerBoardToScore(winnerBoards[0]);
};

const mapToWinnerBoardsInWonOrder = ({
  drawnNumbers,
  boards,
}: DrawnNumbersAndBoards): WinnerBoard[] => {
  return boards
    .map((board) => mapToWinnerBoard(drawnNumbers, board))
    .filter(isNonNull)
    .sort((lhs, rhs) => lhs.drawnNumbers.length - rhs.drawnNumbers.length);
};

interface WinnerBoard {
  board: Board;
  drawnNumbers: number[];
}

const mapToWinnerBoard = (
  drawnNumbers: number[],
  board: Board
): WinnerBoard | null => {
  interface State {
    won: boolean;
    wonDrawnNumbers: number[];
  }

  const { won, wonDrawnNumbers } = drawnNumbers.reduce(
    ({ won, wonDrawnNumbers }: State, drawnNumber: number): State => {
      if (won) {
        return { won, wonDrawnNumbers };
      } else {
        const currentDrawnNumbers: number[] = [...wonDrawnNumbers, drawnNumber];
        return {
          won: hasBoardWon(board, currentDrawnNumbers),
          wonDrawnNumbers: currentDrawnNumbers,
        };
      }
    },
    { won: false, wonDrawnNumbers: [] }
  );

  if (won) {
    return { board, drawnNumbers: wonDrawnNumbers };
  } else {
    return null;
  }
};

const hasBoardWon = (board: Board, drawnNumbers: number[]): boolean => {
  const anyRowMarked: boolean = board.some((row) =>
    row.every((number) => drawnNumbers.includes(number))
  );

  return anyRowMarked || anyColumnMarked(board, drawnNumbers);
};

const anyColumnMarked = (board: Board, drawnNumbers: number[]): boolean => {
  return intRange(board[0].length).some((columnIndex) => {
    const column: number[] = board.map((row) => row[columnIndex]);
    return column.every((number) => drawnNumbers.includes(number));
  });
};

const mapWinnerBoardToScore = ({
  drawnNumbers,
  board,
}: WinnerBoard): number => {
  const sumOfUnmarkedNumbers: number = board
    .flat()
    .filter((number) => !drawnNumbers.includes(number))
    .reduce((lhs, rhs) => lhs + rhs, 0);

  return sumOfUnmarkedNumbers * drawnNumbers[drawnNumbers.length - 1];
};
