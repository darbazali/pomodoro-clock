import React from "react";
import { render } from "react-dom";

import BreakController from "./components/BreakController";
import SessionController from "./components/SessionController";

const App = () => {
  return (
    <div>
      <h1>Hello React!</h1>
      <BreakController />
      <SessionController />
    </div>
  );
};

render(<App />, document.getElementById("root"));
