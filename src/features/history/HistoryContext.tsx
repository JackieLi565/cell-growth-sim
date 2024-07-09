import { ReactNode } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FormRule } from "../form/Form";
import { History, HistoryContext } from "./api/useHistory";

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const {
    storedValue: history,
    setValue,
    removeValue,
    error,
  } = useLocalStorage<History>("history", {});

  const add = (value: FormRule) => {
    setValue({
      ...history,
      [crypto.randomUUID()]: value,
    });
  };

  const clear = () => {
    removeValue();
  };

  const remove = (id: string) => {
    const historyCopy = history;
    delete historyCopy[id];
    setValue(historyCopy);
  };

  return (
    <HistoryContext.Provider value={{ history, add, clear, remove, error }}>
      {children}
    </HistoryContext.Provider>
  );
};
