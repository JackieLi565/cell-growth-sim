import { FC } from "react";
import { useHistory } from "./api/useHistory";

export const History: FC = () => {
  const { history } = useHistory();
  return (
    <div>
      {Object.entries(history).map(([id, value]) => (
        <div key={id}>
          <p>{value.interval}</p>
          <p>{value.rows}</p>
          <p>{value.cols}</p>
        </div>
      ))}
    </div>
  );
};
