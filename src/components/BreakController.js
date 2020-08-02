import React from "react";

const BreakController = (props) => {
  return (
    <div id="break-label">
      <button id="break-decrement" onClick={props.handleBreakDec}>
        -
      </button>
      <span id="break-length">{props._break || 5 }</span>
      <button id="break-increment" onClick={props.handleBreakInc}>
        +
      </button>
    </div>
  );
};

export default BreakController;
