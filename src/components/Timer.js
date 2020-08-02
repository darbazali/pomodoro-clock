import React from "react";

const Timer = ({ status, timer, startStop, reset, label }) => {
  return (
    <div id="timer-label">
      <p>{status || "Session"}</p>
      <h3 id="time-left">{timer}</h3>

      <button id="start_stop" onClick={startStop}>
        {label === true ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default Timer;
