import { CellValue } from "../features/grid/cell/Cell";

/**
 *
 * @param {number} rows number of rows
 * @param {number} cols number of columns
 * @param {CellValue[][]} prev previous grid data
 * @returns {CellValue[][]} a grid of size rows x cols
 */
export const createGrid = (
  rows: number,
  cols: number,
  prev?: CellValue[][]
): CellValue[][] => {
  const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));

  if (prev) {
    for (let i = 0; i < Math.min(rows, prev.length); i++) {
      for (let j = 0; j < Math.min(cols, prev[i].length); j++) {
        newGrid[i][j] = prev[i][j];
      }
    }
  }

  return newGrid;
};
