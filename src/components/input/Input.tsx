import "./style.css";

import { FC, InputHTMLAttributes } from "react";

export interface Input extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: FC<Input> = (props) => {
  return (
    <label className="label">
      {props.label}
      <input className="input" type="number" {...props} />
    </label>
  );
};
