import "./styles/App.css";
import { type FC } from "react";
import { Form } from "./features/form/Form";
import { Data } from "./features/data/Data";
import { History } from "./features/history/History";
import { HistoryProvider } from "./features/history/HistoryContext";

const App: FC = () => {
  return (
    <div className="app">
      <HistoryProvider>
        <Form />
        <History />
      </HistoryProvider>
      <Data data={[]} />
    </div>
  );
};

export default App;
