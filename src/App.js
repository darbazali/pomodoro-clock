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
  const [time, setTime] = useState(1500);

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
    if ( isRunning ) {
      if ( status == 'session' &&  time <= 0 ) {
        // if session time done?
        // start the break time
        // play the buzzer
        audio.current.play();
        setStatus('break')
        setTime(breakTime * 60);
      }

      if (status == 'break' && time <= 0) {
        setIsRunning(false);
        audio.current.play();
        setStatus('session')
        setTime(session * 60)
        reset();
      }
    }

  }, [time]);

  /*====================================
    TIMER FUNCTIONS
  =====================================*/
  const tick = () => {
    interval.current = setInterval(() => {
      setTime( time => time - 1)
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
    setTime(1500);
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
        setTime( (session + 1) * 60 )
      }
    }
  };

  const sessionDEC = () => {
    if (isRunning === false) {
      if (session > 1) {
        setSession(session - 1);
        setTime((session - 1) * 60)
      }
    }
  };

  const breakINC = () => {
    if (isRunning === false) {
      if (breakTime < 60) {
        setBreakTime(breakTime + 1);
      }
    }
  };

  const breakDEC = () => {
    if (isRunning === false) {
      if (breakTime > 1) {
        setBreakTime(breakTime - 1);
      }
    }
  };

  const clockify = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
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
        <h2 id="time-left">{clockify(time)}</h2>

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
