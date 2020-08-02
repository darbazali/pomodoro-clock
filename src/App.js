import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";

import BreakController from "./components/BreakController";
import SessionController from "./components/SessionController";
import Timer from "./components/Timer";
import Audio from "./components/Audio";

const App = () => {
  /*====================================
    DEFINE HOOKS
  =====================================*/

  const [breakTime, setBreakTime] = useState(5);
  const [session, setSession] = useState(25);

  const [_break, setBreak] = useState(breakTime * 60);
  const [_timer, setTimer] = useState(session * 60);

  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("session");
  // end of hooks

  /*====================================
    DEFINE VARIABLES
  =====================================*/
  const audio = useRef();
  let interval = null;

  /*====================================
    TIMER FUNCTIONS
  =====================================*/

  const clockify = (duration) => {
    let timer = duration,
      minutes,
      seconds;

    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let time = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = 0;
    }

    return time;
  };

  const tick = () => {
    if (isRunning === true) {
      if (status === "session") {
        setTimer((timer) => timer - 1);
      } else if (status === "break") {
        setBreak((_break) => _break - 1);
      }
    }
  };

  const start = () => {
    setIsRunning(true);
    tick();
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(interval);
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(interval);
    setStatus("session");
    setTimer(1500);
    setBreak(300);
    setSession(25);
    setBreakTime(5);
    audio.current.pause();
  };

  /*====================================
    DEFINE HANDLERS
  =====================================*/
  const sessionINC = () => {
    if (isRunning === false) {
      if (session < 60) {
        setSession(session + 1);
        setTimer(_timer + 60);
      }
    }
  };

  const sessionDEC = () => {
    if (isRunning === false) {
      if (session > 1) {
        setSession(session - 1);
        setTimer(_timer - 60);
      }
    }
  };

  const breakINC = () => {
    if (isRunning === false) {
      if (breakTime < 60) {
        setBreakTime(breakTime + 1);
        setBreak(_break + 60);
      }
    }
  };

  const breakDEC = () => {
    if (isRunning === false) {
      if (breakTime > 1) {
        setBreakTime(breakTime - 1);
        setBreak(_break - 60);
      }
    }
  };

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <Timer
        status={status}
        timer={status === "session" ? clockify(_timer) : clockify(_break)}
        startStop={isRunning === false ? start : pause}
        label={isRunning}
        reset={reset}
      />

      <BreakController
        breakDEC={breakDEC}
        breakINC={breakINC}
        _break={breakTime}
      />

      <SessionController
        sessionDEC={sessionDEC}
        sessionINC={sessionINC}
        session={session}
      />
      <Audio audio={audio} />
    </div>
  );
};

render(<App />, document.getElementById("root"));
