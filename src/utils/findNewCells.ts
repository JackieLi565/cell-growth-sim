export interface Node {
  row: number;
  col: number;
}

export type Direction = [number, number];

/**
 *
 * @param {number[][]} grid - The grid to find new cells within
 * @param {Node} startNode - The starting node
 * @returns {Node[]} - New cells to traverse
 */
export const findNewCells = (grid: number[][], startNode: Node) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions: Direction[] = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  const updates: Node[] = [];

  for (const [dRow, dCol] of directions) {
    const newRow = startNode.row + dRow;
    const newCol = startNode.col + dCol;

    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      if (grid[newRow][newCol] === 0) {
        updates.push({ row: newRow, col: newCol });
      }
    }
  }

  return updates;
};
