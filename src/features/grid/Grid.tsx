import { CellVsTime } from "../data/api/types";
import { Cell } from "./cell/Cell";
import "./styles.css";

import { FC, useState } from "react";

interface GridProps {
  running: boolean;
}

export const Grid: FC<GridProps> = ({ running }) => {
  const [grid, setGrid] = useState<number[][]>(createGrid(80, 80));
  const [growth, _] = useState<number>(1000);
  const [growthData, setGrowthData] = useState<CellVsTime[]>([]);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setGrid((prevGrid) => {
        // check if grid is full
        const firstEle = prevGrid.flat().sort((a, b) => a - b)[0];
        if (firstEle !== 0) {
          setRunning(false);
        }

        const newGrid = prevGrid.map((row) => row.slice());
        const cellsToUpdate: Node[] = [];

        for (let row = 0; row < prevGrid.length; row++) {
          for (let col = 0; col < prevGrid[row].length; col++) {
            if (prevGrid[row][col] === 1) {
              const newCells = findNewCells(prevGrid, { row, col });
              if (newCells.length > 0) {
                for (const newCell of newCells) {
                  cellsToUpdate.push(newCell);
                }
              }
            }
          }
        }

        cellsToUpdate.forEach(({ row, col }) => {
          newGrid[row][col] = 1;
        });

        const cellCount = newGrid.flat().filter((cell) => cell === 1).length;

        setGrowthData((prevData) => [...prevData, { time, cells: cellCount }]);
        setTime((prevTime) =>
          parseFloat((prevTime + growth / 1000).toFixed(2))
        );

        return newGrid;
      });
    }, growth);

    return () => clearInterval(timer);
  }, [running, growth, time, growthData]);

  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${grid.length}, 5px)`,
        gridTemplateColumns: `repeat(${grid[0].length}, 5px)`,
      }}
    >
      {grid.map((items, row) => (
        <div key={row} className="row">
          {items.map((value, col) => (
            <Cell
              key={`${row}-${col}`}
              value={value}
              row={row}
              col={col}
              onCellClick={console.log}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
