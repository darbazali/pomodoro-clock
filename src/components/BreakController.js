import React from "react";

const BreakController = (props) => {
  return (
    <div id="break-label">
      <div className="control-name">
        <p>Break Length</p>
      </div>

      <div className="controls">
        <button id="break-decrement" onClick={props.handleBreakDec}>
          -
        </button>
        <span id="break-length">{props._break || 5}</span>
        <button id="break-increment" onClick={props.handleBreakInc}>
          +
        </button>
      </div>
    </div>
  );
};

export default BreakController;
