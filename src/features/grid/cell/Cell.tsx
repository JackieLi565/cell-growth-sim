import "./styles.css";

import { FC } from "react";

export interface CellProps {
  value: 0 | 1;
  row: number;
  col: number;
  onCellClick: (row: number, col: number) => void;
}

export const Cell: FC<CellProps> = ({ value, row, col, onCellClick }) => {
  if (value === 1) {
    return (
      <div className="cell occupied" onClick={() => onCellClick(row, col)} />
    );
  } else {
    return <div className="cell empty" onClick={() => onCellClick(row, col)} />;
  }
};
