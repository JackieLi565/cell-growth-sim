import "./style.css";

import { ButtonHTMLAttributes, FC } from "react";

export interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<Button> = (props) => {
  return (
    <button type="button" className="button" {...props}>
      {props.children}
    </button>
  );
};
