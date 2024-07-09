import { createContext, useContext } from "react";
import { FormRule } from "../../form/Form";

export interface History {
  [uuid: string]: FormRule;
}

interface HistoryContextProps {
  history: History;
  add: (value: FormRule) => void;
  clear: () => void;
  remove: (id: string) => void;
  error: string;
}

export const HistoryContext = createContext<HistoryContextProps | undefined>(
  undefined
);

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
