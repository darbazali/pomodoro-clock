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
  const interval = useRef();

  /*====================================
      useEFECT
  =====================================*/
  useEffect(() => {
    if (isRunning) {
      if (_timer == 0) {
        audio.current.play();
        setTimeout(() => {
          setStatus("break");
        }, 1000);
        
      }

      if (_break == 0) {
        setTimeout(() => {
          setStatus("session");
        }, 1000);
        audio.current.play();
        // reset();
      }

      
    }
    // return () => clearInterval(interval.current);
  }, [_timer, _break]);

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
      time = "00:00"
    }

    return time;
  };

  const tick = () => {
    interval.current = setInterval(() => {
      if (status === "session") {
      setTimer((_timer) => _timer - 1);
    } else if (status === "break") {
      setBreak((_break) => _break - 1);
    }
    }, 1000);
    
  };

  const start = () => {
    setIsRunning(true);
    tick();
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(interval.current);
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(interval.current);
    setStatus("session");
    setTimer(1500);
    setBreak(300);
    setSession(25);
    setBreakTime(5);
    audio.current.pause();
    audio.current.currentTime = 0;
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

  const play = () => {
    if (status === "session") {
      return clockify(_timer);
    } else {
      return clockify(_break);
    }
  };

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      {/* <Timer
        status={status}
        timer={clockify(_timer)}
        startStop={isRunning === false ? start : pause}
        label={isRunning}
        reset={reset}
      /> */}
      <div id="timer-label">
        <p>{status}</p>
        <h2 id="time-left">{play()}</h2>

        <button onClick={isRunning === false ? start : pause} id="start_stop">
          {isRunning === true ? "Pause" : "Start"}
        </button>

        <button onClick={reset} id="reset">
          Reset
        </button>
      </div>

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
