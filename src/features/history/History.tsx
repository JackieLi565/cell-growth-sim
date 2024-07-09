import "./styles.css";

import { FC } from "react";
import { useHistory } from "./api/useHistory";
import { Button } from "../../components/button/Button";
import { useUrlParams } from "../../hooks/useUrlParams";
import { FormRule } from "../form/Form";

export const History: FC = () => {
  const { history, remove, clear } = useHistory();
  const { setParam } = useUrlParams();

  const handleSelect = (data: FormRule) => {
    setParam("interval", String(data.interval));
    setParam("rows", String(data.rows));
    setParam("cols", String(data.cols));
  };

  const items = Object.entries(history);

  return (
    <div className="history-container">
      <h2>Previous Simulations</h2>
      {items.length ? (
        <>
          <Button onClick={() => clear()}>Clear</Button>
          <div>
            {items.map(([id, value]) => (
              <div className="history" key={id}>
                <p>Interval: {value.interval}</p>
                <p>Rows: {value.rows}</p>
                <p>Columns: {value.cols}</p>
                <div className="button-container">
                  <Button onClick={() => remove(id)}>Remove</Button>
                  <Button onClick={() => handleSelect(value)}>Select</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <p>No previous simulations found.</p>
        </div>
      )}
    </div>
  );
};
