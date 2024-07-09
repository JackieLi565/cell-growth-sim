import { FC } from "react";
import { useHistory } from "./api/useHistory";

export const History: FC = () => {
  const { history, remove } = useHistory();
  return (
    <div>
      {Object.entries(history).map(([id, value]) => (
        <div key={id}>
          <p>{value.interval}</p>
          <p>{value.rows}</p>
          <p>{value.cols}</p>
          <button onClick={() => remove(id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
