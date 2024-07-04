import "./index.css";

import { FC } from "react";

interface GridProps {
  grid: number[][];
  onCellClick: (row: number, col: number) => void;
}

export const Grid: FC<GridProps> = ({ grid, onCellClick }) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${grid.length}, 5px)`,
        gridTemplateColumns: `repeat(${grid[0].length}, 5px)`,
      }}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell ? "occupied" : "empty"}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
