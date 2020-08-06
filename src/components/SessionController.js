import React from "react";

const SessionController = ({ session, sessionINC, sessionDEC }) => {
  return (
    <div id="session-label">
      <div className="control-name">
        <p>Session(m)</p>
      </div>

      <div className="controls">
        <button id="session-decrement" onClick={sessionDEC} className="btn">
          -
        </button>
        <span id="session-length">{session}</span>
        <button id="session-increment" onClick={sessionINC} className="btn">
          +
        </button>
      </div>
    </div>
  );
};

export default SessionController;
