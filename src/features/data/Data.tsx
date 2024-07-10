import "./styles.css";

import { FC } from "react";
import { Table } from "./table/Table";
import { CellVsTime } from "./api/types";
import { Graph } from "./graph/Graph";

/**
 * DataProps interface represents the props for the Data component.
 * @property {CellVsTime[]} data - Array of data points with time and cell count
 */
export interface DataProps {
  data: CellVsTime[];
}

/**
 * Data component renders both a Graph and a Table to display cell growth data over time.
 * @param {DataProps} props - The properties for the Data component
 * @returns {JSX.Element} - The JSX element representing the combined data visualization
 */
export const Data: FC<DataProps> = ({ data }) => {
  return (
    <div className="data-container">
      <Table data={data} overflow />
      <Graph data={data} />
    </div>
  );
};
