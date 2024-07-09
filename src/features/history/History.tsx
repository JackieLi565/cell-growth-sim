import { FC } from "react";
import { FormRule } from "../form/Form";

interface HistoryProps {
  history: FormRule[];
}

export const History: FC<HistoryProps> = ({ history }) => {
  return (
    <div>
      {history.map((value, index) => (
        <div key={index}>
          <p>{value.interval}</p>
          <p>{value.rows}</p>
          <p>{value.cols}</p>
        </div>
      ))}
    </div>
  );
};
