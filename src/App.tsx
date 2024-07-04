import "./App.css";
import { type FC, useState, useEffect } from "react";
import { findNewCells, Node } from "./utils/findNewCells";
import { createGrid } from "./utils/createGrid";
import { Grid } from "./features/grid/Grid";
import { ResizeGrid } from "./features/resize-grid/ResizeGrid";
import { GrowthChart } from "./features/growth-rate/GrowthChart";
import { Button } from "./components/button/Button";
import { Input } from "./components/input/Input";
import { CellVsTime } from "./features/growth-rate/api/CellVsTime";
import { GrowthTable } from "./features/growth-rate/GrowthTable";

const App: FC = () => {
  const [grid, setGrid] = useState<number[][]>(createGrid(80, 80));
  const [growth, setGrowth] = useState<number>(1000);
  const [running, setRunning] = useState<boolean>(false);
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

  const handleCellClick = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => row.slice());
      newGrid[row][col] = newGrid[row][col] ? 0 : 1;
      return newGrid;
    });
  };

  const handleReset = () => {
    setRunning(false);
    setGrowthData([]);
    setTime(0);
    setGrid(createGrid(80, 80));
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrowth(Number(e.target.value));
  };

  return (
    <div className="app">
      <Grid grid={grid} onCellClick={handleCellClick} />
      <form style={{ padding: "20px" }}>
        <Input
          min={1}
          type="number"
          label="Test"
          value={growth}
          onChange={handleIntervalChange}
        />
        <ResizeGrid running={running} grid={grid} onGridChange={setGrid} />
        <div style={{ display: "flex", gap: "5px", marginTop: "20px" }}>
          <Button onClick={() => setRunning((prev) => !prev)}>
            {running ? "Pause" : "Start"}
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </form>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <GrowthChart growthData={growthData} />
          <GrowthTable growthData={growthData} />
        </div>
      </div>
    </div>
  );
};

export default App;
