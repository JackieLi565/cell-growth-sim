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
      <div className="history-container">
        <HistoryProvider>
          <Form start={start} onStart={setStart} />
          <div>
            <History />
          </div>
        </HistoryProvider>
      </div>
      <Grid start={start} />
    </div>
  );
};

export default App;
