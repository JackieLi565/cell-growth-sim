import { FC, useEffect, useState } from "react";
import { CellVsTime } from "../api/types";

/**
 * GraphProps interface represents the props for the Graph component.
 * @property {CellVsTime[]} data - Array of data points with time and cell count
 * @property {number} [height=400] - Optional height of the graph. Defaults to 400
 * @property {number} [width=500] - Optional width of the graph. Defaults to 500
 */
interface GraphProps {
  data: CellVsTime[];
  height?: number;
  width?: number;
}

/**
 * Graph component renders a graph visualizing cell growth over time.
 * @param {GraphProps} props - Props of graph
 * @returns {JSX.Element} - The SVG element representing the graph
 */
export const Graph: FC<GraphProps> = ({ data, height = 400, width = 500 }) => {
  const [dimensions, setDimensions] = useState({
    height,
    width,
  });

  useEffect(() => {
    setDimensions({
      height,
      width,
    });
  }, [height, width]);

  const padding = 40;
  const maxTime = Math.max(...data.map((d) => d.time), 0);
  const maxCells = Math.max(...data.map((d) => d.cells), 0);

  // Calcualte scale
  const xScale = (value: number) =>
    (value / maxTime) * (dimensions.width - padding * 2) + padding;
  const yScale = (value: number) =>
    height - padding - (value / maxCells) * (dimensions.height - padding * 2);

  // Create SVG string
  const linePath = data
    .map((d, i) => {
      const x = xScale(d.time);
      const y = yScale(d.cells);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={dimensions.width} height={dimensions.height}>
      <g>
        <line
          x1={padding}
          y1={dimensions.height - padding}
          x2={dimensions.width - padding}
          y2={dimensions.height - padding}
          stroke="black"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={dimensions.height - padding}
          stroke="black"
        />
        <text
          x={dimensions.width / 2}
          y={dimensions.height - 10}
          textAnchor="middle"
        >
          Time
        </text>
        <text
          x={20}
          y={dimensions.height / 2}
          textAnchor="middle"
          transform={`rotate(-90, 20, ${dimensions.height / 2})`}
        >
          Cells
        </text>
      </g>
      <path d={linePath} fill="none" stroke="#763f98" />
    </svg>
  );
};
