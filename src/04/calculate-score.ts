import { intRange, isNonNull } from "../common";

export type Board = number[][];

export interface DrawnNumbersAndBoards {
  drawnNumbers: number[];
  boards: Board[];
}

export const calculateLastWinnerScore = ({
  drawnNumbers,
  boards,
}: DrawnNumbersAndBoards): number => {
  const wonBoards: WonBoard[] = mapToWonBoards({ drawnNumbers, boards });

  const lastWonBoard: WonBoard = wonBoards.reduce((lhs, rhs) => {
    if (lhs.drawnNumbers.length > rhs.drawnNumbers.length) {
      return lhs;
    } else {
      return rhs;
    }
  });

  return calculateScoreForBoard(lastWonBoard.board, lastWonBoard.drawnNumbers);
};

export const calculateScore = ({
  drawnNumbers,
  boards,
}: DrawnNumbersAndBoards): number => {
  const wonBoards: WonBoard[] = mapToWonBoards({ drawnNumbers, boards });

  const firstWonBoard: WonBoard = wonBoards.reduce((lhs, rhs) => {
    if (lhs.drawnNumbers.length < rhs.drawnNumbers.length) {
      return lhs;
    } else {
      return rhs;
    }
  });

  return calculateScoreForBoard(
    firstWonBoard.board,
    firstWonBoard.drawnNumbers
  );
};

const mapToWonBoards = ({
  drawnNumbers,
  boards,
}: DrawnNumbersAndBoards): WonBoard[] => {
  return boards
    .map((board) => mapToWonBoard(drawnNumbers, board))
    .filter(isNonNull);
};

interface WonBoard {
  board: Board;
  drawnNumbers: number[];
}

const mapToWonBoard = (
  drawnNumbers: number[],
  board: Board
): WonBoard | null => {
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

interface State {
  drawnNumbers: number[];
  score: number | null;
}

const createStateReducer =
  (boards: Board[]) =>
  ({ drawnNumbers, score }: State, drawnNumber: number): State => {
    if (score !== null) {
      return {
        drawnNumbers,
        score,
      };
    } else {
      const currentDrawnNumbers: number[] = [...drawnNumbers, drawnNumber];
      const wonBoard: Board | null = getWinnerBoard(
        boards,
        currentDrawnNumbers
      );

      if (wonBoard) {
        return {
          drawnNumbers: currentDrawnNumbers,
          score: calculateScoreForBoard(wonBoard, currentDrawnNumbers),
        };
      } else {
        return {
          drawnNumbers: currentDrawnNumbers,
          score: null,
        };
      }
    }
  };

const getWinnerBoard = (
  boards: Board[],
  drawnNumbers: number[]
): Board | null => {
  return boards.find((board) => hasBoardWon(board, drawnNumbers)) || null;
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

const calculateScoreForBoard = (
  board: Board,
  drawnNumbers: number[]
): number => {
  const sumOfUnmarkedNumbers: number = board
    .flat()
    .filter((number) => !drawnNumbers.includes(number))
    .reduce((lhs, rhs) => lhs + rhs, 0);

  return sumOfUnmarkedNumbers * drawnNumbers[drawnNumbers.length - 1];
};
