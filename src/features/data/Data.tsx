import "./styles.css";

import { FC } from "react";
import { Table } from "./table/Table";
import { CellVsTime } from "./api/types";
import { Graph } from "./graph/Graph";

export interface DataProps {
  data: CellVsTime[];
}

export const Data: FC<DataProps> = ({ data }) => {
  return (
    <div className="data-container">
      <Graph data={data} />
      <Table data={data} />
    </div>
  );
};
