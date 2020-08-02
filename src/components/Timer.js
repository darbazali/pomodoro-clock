import React from "react";

const Timer = (props) => {
  return (
    <div id="timer-label">
      <p>{props.status || "Session"}</p>
      <h3 id="time-left">{props.timer || "25:00"}</h3>

      <button id="start_stop" onClick={props.handleStartStop}>
        Start
      </button>
      <button id="reset" onClick={props.handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Timer;
