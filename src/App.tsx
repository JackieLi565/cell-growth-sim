import "./styles/App.css";
import { useState, type FC } from "react";
import { Form } from "./features/form/Form";
import { History } from "./features/history/History";
import { HistoryProvider } from "./features/history/HistoryContext";
import { Grid } from "./features/grid/Grid";

const App: FC = () => {
  const [start, setStart] = useState(false);
  return (
    <div className="app">
      <Grid start={start} />
      <HistoryProvider>
        <Form start={start} onStart={setStart} />
        <History />
      </HistoryProvider>
    </div>
  );
};

export default App;
