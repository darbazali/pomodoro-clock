import React from "react";

const SessionController = (props) => {
  return (
    <div id="session-label">
      <div className="control-name">
        <p>Session Length</p>
      </div>

      <div className="controls">
        <button id="session-decrement" onClick={props.handleSessionDec}>
          -
        </button>
        <span id="session-length">{props.session || 25}</span>
        <button id="session-increment" onClick={props.handleSessionInc}>
          +
        </button>
      </div>
    </div>
  );
};

export default SessionController;
