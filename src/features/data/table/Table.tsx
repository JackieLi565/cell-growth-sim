import "./styles.css";

import { CellVsTime } from "../api/types";
import { FC } from "react";

interface TableProps {
  data: CellVsTime[];
  height?: number;
  width?: number;
}

export const Table: FC<TableProps> = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Number of Cells</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={`${data.time}-${index}`}>
              <td>{data.time}</td>
              <td>{data.cells}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
