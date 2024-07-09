import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { FormRule } from "../../form/Form";

export const useHistory = () => {
  return useLocalStorage<FormRule[]>("history", []);
};
