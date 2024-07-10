import "./styles.css";
import { CellVsTime } from "../api/types";
import { CSSProperties, FC } from "react";

/**
 * TableProps interface represents the props for the Table component.
 * @property {CellVsTime[]} data - Array of data points with time and cell count
 * @property {number} [height=400] - Optional height of the table
 * @property {number} [width=500] - Optional width of the table
 * @property {boolean} [overflow=false] - Optional overflow scroll bar of the table
 */
interface TableProps {
  data: CellVsTime[];
  height?: number;
  width?: number;
  overflow?: boolean;
}

/**
 * Table component renders a table displaying cell growth data over time.
 * @param {TableProps} props - The properties for the Table component
 * @returns {JSX.Element} - The JSX element representing the table
 */
export const Table: FC<TableProps> = ({
  data,
  height = 400,
  width = 500,
  overflow = false,
}) => {
  const styles: CSSProperties = {
    height,
    width,
  };

  if (overflow) {
    styles.overflowY = "auto";
  }

  return (
    <div className="table-container" style={styles}>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Number of Cells</th>
          </tr>
        </thead>
        <tbody>
          {!data.length ? (
            <tr>
              <td colSpan={2} className="empty-message">
                No data available
              </td>
            </tr>
          ) : (
            data.map((data, index) => (
              <tr key={`${data.time}-${index}`}>
                <td>{data.time}</td>
                <td>{data.cells}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
