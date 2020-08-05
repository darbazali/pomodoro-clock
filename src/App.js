/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";

// import BreakController from "./components/BreakController";
// import SessionController from "./components/SessionController";
// import Timer from "./components/Timer";
// import Audio from "./components/Audio";

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

const Audio = ({ audio }) => {
  return (
    <audio
      id="beep"
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ref={audio}
    />
  );
};

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
    if (isRunning) {
      if (status == "session" && time <= 0) {
        // if session time done?
        // start the break time
        // play the buzzer
        audio.current.play();
        setStatus("break");
        setTime(breakTime * 60);
      }

      if (status == "break" && time <= 0) {
        setIsRunning(false);
        audio.current.play();
        setStatus("session");
        setTime(session * 60);
        reset();
      }
    }
  }, [time]);

  /*====================================
    TIMER FUNCTIONS
  =====================================*/
  const tick = () => {
    interval.current = setInterval(() => {
      setTime((time) => time - 1);
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
        setTime((session + 1) * 60);
      }
    }
  };

  const sessionDEC = () => {
    if (isRunning === false) {
      if (session > 1) {
        setSession(session - 1);
        setTime((session - 1) * 60);
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
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  return (
    <div>
      <div id="timer-label">
        <p>{status}</p>
        <div id="display">
          <button onClick={reset} id="reset" className="round-btn">
            Reset
          </button>

          <h1 id="time-left">{clockify(time)}</h1>

          <button
            onClick={isRunning === false ? start : pause}
            id="start_stop"
            className="round-btn"
          >
            {isRunning === true ? "Pause" : "Start"}
          </button>
        </div>
      </div>

      <div id="controls">
        <BreakController
          breakDEC={breakDEC}
          breakINC={breakINC}
          _break={breakTime}
        />

        <div id="author">© 2020, a product from <a href="https://darbaz.design" target="_blank" rel="noopener noreferrer">Darbaz Ali</a></div>

        <SessionController
          sessionDEC={sessionDEC}
          sessionINC={sessionINC}
          session={session}
        />
      </div>
      <Audio audio={audio} />
    </div>
  );
};

render(<App />, document.getElementById("root"));
