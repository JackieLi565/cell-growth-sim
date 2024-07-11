import "./styles.css";

import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useUrlParams } from "../../hooks/useUrlParams";
import { defaultParseUnsignedInt } from "../../utils/defaultParseUnsignedInt";
import { useHistory } from "../history/api/useHistory";
import { Checkbox } from "../../components/checkbox/Checkbox";

/**
 * FormRule interface represents the properties of the form.
 * @property {number} interval - The growth rate of the petri dish
 * @property {number} rows - The number of row inputs
 * @property {number} cols - The number of column inputs
 */
export interface FormRule {
  interval: number;
  rows: number;
  cols: number;
}

/**
 * FormProps interface represents the props for the Form component.
 * @property {function} onStart - A function to control the activity of the program
 * @property {boolean} start - A parameter to determine if the program has started
 */
export interface FormProps {
  onStart: Dispatch<SetStateAction<boolean>>;
  start: boolean;
}

/**
 * Form component renders a form displaying petri dish setting inputs.
 * @param {FormProps} props - The properties for the Form component
 * @returns {JSX.Element} - The JSX element representing the Form
 */
export const Form: FC<FormProps> = ({ onStart, start }) => {
  const { add } = useHistory();
  const { params, setParam } = useUrlParams();
  const [running, setRunning] = useState(start);
  const [limit, setLimit] = useState(true);
  const [form, setForm] = useState<FormRule>({
    interval: 1000,
    rows: 20,
    cols: 20,
  });

  useEffect(() => {
    setRunning(start);
  }, [start]);

  useEffect(() => {
    setForm({
      interval: defaultParseUnsignedInt(params.get("interval"), 1000),
      rows: defaultParseUnsignedInt(params.get("rows"), 20),
      cols: defaultParseUnsignedInt(params.get("cols"), 20),
    });
  }, [params]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      (name === "rows" || name === "cols") &&
      defaultParseUnsignedInt(value) < 1
    ) {
      return;
    }

    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setParam(name, value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    add(form);
  };

  const handleLimit = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(e.target.checked);

    if (e.target.checked) {
      if (form.rows > 800) {
        setParam("rows", String(800));
      }

      if (form.cols > 800) {
        setParam("cols", String(800));
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Petri Dish Settings</h2>

      <Input
        label="Interval"
        min={1}
        name="interval"
        value={form.interval}
        onChange={handleChange}
      />
      <Input
        label="Rows"
        min={1}
        {...(limit ? { max: 800 } : {})}
        name="rows"
        value={form.rows}
        onChange={handleChange}
      />
      <Input
        label="Columns"
        min={1}
        {...(limit ? { max: 800 } : {})}
        name="cols"
        value={form.cols}
        onChange={handleChange}
      />
      <div className="control-container">
        {running ? (
          <Button type="button" onClick={() => onStart(false)}>
            Pause
          </Button>
        ) : (
          <>
            <Button type="button" onClick={() => onStart(true)}>
              Start
            </Button>
            <Button type="submit">Save Simulation</Button>
          </>
        )}
        <Checkbox label="Limit" checked={limit} onChange={handleLimit} />
      </div>
    </form>
  );
};
