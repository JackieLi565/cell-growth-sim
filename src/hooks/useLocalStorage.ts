import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [error, setError] = useState<string>("");
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      setStoredValue(initialValue);
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      setError(`Error parsing localStorage key value '${key}':${error}`);
      setStoredValue(initialValue);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      } else {
        throw new Error("Object 'window' is undefined");
      }
    } catch (error) {
      setError(`Error setting localStorage key '${key}':${error}`);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      } else {
        throw new Error("Object 'window' is undefined");
      }
    } catch (error) {
      setError(`Error removing localStorage key '${key}':${error}`);
    }
  };

  return { storedValue, setValue, removeValue, error };
};
