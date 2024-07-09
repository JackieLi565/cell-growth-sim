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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: _, ...rest } = history;
    setValue(rest);
  };

  return (
    <HistoryContext.Provider value={{ history, add, clear, remove, error }}>
      {children}
    </HistoryContext.Provider>
  );
};
