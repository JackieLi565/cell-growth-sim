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

/**
 * A React hook for accessing history context data
 * @returns {HistoryContextProps} - History context
 * @note - useHistory will throw if the hook is used in a child component outside of the HistoryContextProvider
 */
export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
