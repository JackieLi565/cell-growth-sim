import { FC, PropsWithChildren } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FormRule } from "../form/Form";
import { History, HistoryContext } from "./api/useHistory";

/**
 * A interface that extends from the PropsWithChildren interface for react child node access
 */
export interface HistoryProviderProps extends PropsWithChildren {}

/**
 * HistoryProvider component that provides history context data to child components.
 * @param {HistoryProviderProps} props - The properties for the HistoryProvider component
 * @returns {JSX.Element} - The JSX element representing the HistoryProvider
 */
export const HistoryProvider: FC<HistoryProviderProps> = ({ children }) => {
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
