import "./styles.css";

import { FC } from "react";

interface GridProps {}

export const Grid: FC<GridProps> = () => {
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
