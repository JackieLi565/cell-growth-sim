import "./styles.css";

import { useUrlParams } from "../../hooks/useUrlParams";
import { createGrid } from "../../utils/createGrid";
import { defaultParseUnsignedInt } from "../../utils/defaultParseUnsignedInt";
import { Cell, CellValue } from "./cell/Cell";
import { FC, useEffect, useState } from "react";
import { findNewCells, Node } from "../../utils/findNewCells";
import { CellVsTime } from "../data/api/types";
import { Button } from "../../components/button/Button";
import { Data } from "../data/Data";
interface GridProps {
  start: boolean;
}

export const Grid: FC<GridProps> = ({ start }) => {
  const { params } = useUrlParams();
  const [running, setRunning] = useState(start);
  const [grid, setGrid] = useState<CellValue[][]>(createGrid(20, 20));
  const [growth, setGrowth] = useState(1000);
  const [growthData, setGrowthData] = useState<CellVsTime[]>([]);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setRunning(start);
  }, [start]);

  useEffect(() => {
    const interval = defaultParseUnsignedInt(params.get("interval"), 1000);
    const rows = defaultParseUnsignedInt(params.get("rows"), 20);
    const cols = defaultParseUnsignedInt(params.get("cols"), 20);
    setGrid((prev) => createGrid(rows, cols, prev));
    setGrowth(interval);
  }, [params]);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setGrid((prevGrid) => {
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

  const handleCellClick = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => row.slice());
      newGrid[row][col] = newGrid[row][col] ? 0 : 1;
      return newGrid;
    });
  };

  return (
    <div>
      <div className="data-grid-container">
        <div className="grid-container">
          <div
            className="grid"
            style={{
              gridTemplateRows: `repeat(${grid.length}, 10px)`,
              gridTemplateColumns: `repeat(${grid[0].length}, 10px)`,
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
                    onCellClick={handleCellClick}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <Data data={growthData} />
      </div>

      <Button
        onClick={() =>
          setGrid(
            createGrid(
              defaultParseUnsignedInt(params.get("rows"), 20),
              defaultParseUnsignedInt(params.get("cols"), 20)
            )
          )
        }
      >
        Reset Petri Dish
      </Button>
    </div>
  );
};
