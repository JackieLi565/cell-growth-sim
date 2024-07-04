import "./index.css";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { Input } from "../../components/input/Input";
import { createGrid } from "../../utils/createGrid";

export interface ResizeGrid {
  onGridChange: Dispatch<SetStateAction<number[][]>>;
  grid: number[][];
  running: boolean;
}
export const ResizeGrid: FC<ResizeGrid> = ({ onGridChange, grid, running }) => {
  const handleRowChange = (e: ChangeEvent<HTMLInputElement>) => {
    const row = parseInt(e.target.value);
    if (!isNaN(row)) {
      onGridChange((prev) => createGrid(row, prev[0].length));
    }
  };

  const handleColChange = (e: ChangeEvent<HTMLInputElement>) => {
    const col = parseInt(e.target.value);
    if (!isNaN(col)) {
      onGridChange((prev) => createGrid(prev.length, col));
    }
  };

  return (
    <div className="resize-grid">
      <Input
        min={1}
        disabled={running}
        value={grid.length}
        label="Row Size"
        onChange={handleRowChange}
      />
      <Input
        min={1}
        label="Column Size"
        disabled={running}
        value={grid[0].length}
        onChange={handleColChange}
      />
    </div>
  );
};
