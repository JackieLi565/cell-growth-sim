import "./table.css";

import { FC } from "react";
import { CellVsTime } from "./api/CellVsTime";

interface GrowthTable {
  growthData: CellVsTime[];
  height?: number;
  width?: number;
}

export const GrowthTable: FC<GrowthTable> = ({ growthData }) => {
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
          {growthData.map((data, index) => (
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
