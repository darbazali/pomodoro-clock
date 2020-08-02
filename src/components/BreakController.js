import React from "react";

const BreakController = ({ breakDEC, breakINC, _break }) => {
  return (
    <div id="break-label">
      <div className="control-name">
        <p>Break Length</p>
      </div>

      <div className="controls">
        <button id="break-decrement" onClick={breakDEC}>
          -
        </button>
        <span id="break-length">{_break}</span>
        <button id="break-increment" onClick={breakINC}>
          +
        </button>
      </div>
    </div>
  );
};

export default BreakController;
