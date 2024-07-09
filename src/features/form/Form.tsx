import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useUrlParams } from "../../hooks/useUrlParams";
import { defaultParseUnsignedInt } from "../../utils/defaultParseUnsignedInt";

export interface FormRule {
  interval: number;
  rows: number;
  cols: number;
}

export interface FormProps {
  initialValues?: Partial<FormRule>;
}

export const Form: FC<FormProps> = ({ initialValues }) => {
  const { params, setParam } = useUrlParams();
  const [form, setForm] = useState<FormRule>({
    interval: 1000,
    rows: 1,
    cols: 1,
    ...initialValues,
  });

  useEffect(() => {
    const interval = defaultParseUnsignedInt(params.get("interval"), 1000);
    const rows = defaultParseUnsignedInt(params.get("rows"), 1);
    const cols = defaultParseUnsignedInt(params.get("cols"), 1);

    setForm({
      interval,
      rows,
      cols,
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

    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        min={1}
        name="interval"
        value={form.interval}
        onChange={handleChange}
      />
      <Input min={1} name="rows" value={form.rows} onChange={handleChange} />
      <Input min={1} name="cols" value={form.cols} onChange={handleChange} />
      <Button type="submit">Submit</Button>
    </form>
  );
};
