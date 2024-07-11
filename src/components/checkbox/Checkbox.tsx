import { FC, InputHTMLAttributes } from "react";
import "./styles.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <label className="label">
      {props.label}
      <input type="checkbox" {...props} />
    </label>
  );
};
