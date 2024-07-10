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

export interface FormRule {
  interval: number;
  rows: number;
  cols: number;
}

export interface FormProps {
  onStart: Dispatch<SetStateAction<boolean>>;
  start: boolean;
}

export const Form: FC<FormProps> = ({ onStart, start }) => {
  const { add } = useHistory();
  const { params, setParam } = useUrlParams();
  const [running, setRunning] = useState(start);
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

  return (
    <form className="form-container" onSubmit={handleSubmit}>
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
        name="rows"
        value={form.rows}
        onChange={handleChange}
      />
      <Input
        label="Columns"
        min={1}
        name="cols"
        value={form.cols}
        onChange={handleChange}
      />
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
    </form>
  );
};
