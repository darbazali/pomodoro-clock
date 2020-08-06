import React from "react";

const BreakController = ({ breakDEC, breakINC, _break }) => {
  return (
    <div id="break-label">
      <div className="control-name">
        <p>Break(m)</p>
      </div>

      <div className="controls">
        <button id="break-decrement" onClick={breakDEC} className="btn">
          -
        </button>
        <span id="break-length">{_break}</span>
        <button id="break-increment" onClick={breakINC} className="btn">
          +
        </button>
      </div>
    </div>
  );
};

export default BreakController;
