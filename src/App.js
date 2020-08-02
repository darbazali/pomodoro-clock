import React from "react";
import { render } from "react-dom";

import BreakController from './components/BreakController'

const App = () => {
  return (
    <div>
      <h1>Hello React!</h1>
      <BreakController />
    </div>
  );
};

render(<App />, document.getElementById("root"));
