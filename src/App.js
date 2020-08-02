import React from "react";
import { render } from "react-dom";

import BreakController from "./components/BreakController";
import SessionController from "./components/SessionController";
import Timer from './components/Timer';

const App = () => {
  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <Timer />
      <BreakController />
      <SessionController />
    </div>
  );
};

render(<App />, document.getElementById("root"));
