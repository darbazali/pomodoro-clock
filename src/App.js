import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";

import BreakController from "./components/BreakController";
import SessionController from "./components/SessionController";
import Timer from './components/Timer';
import Audio from './components/Audio';

const App = () => {

  /*====================================
    DEFINE HOOKS
  =====================================*/
  const [_break, setBreak] = useState(5);
  const [_timer, setTimer] = useState(25);

  const [breakTime, setBreakTime] = useState(_break * 60 );
  const [session, setSession] = useState(_timer * 60 );

  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('session');
  // end of hooks


  /*====================================
    DEFINE VARIABLES
  =====================================*/
  const audio = useRef();
  let interval = null;

  


  /*====================================
    DEFINE HANDLERS
  =====================================*/
  const sessionINC = () => {
    if ( session < 60 ) {
      setSession( session + 1)
      setTimer( _timer + 60 )
    }
  }

  const sessinDEC = () => {
    if ( session > 1 ) {
      setSession( session - 1 )
      setTimer( _timer - 60 )
    }
  }

  const breakINC = () => {
    if ( breakTime < 60 ) {
      setBreakTime( breakTime + 1 )
      setBreak( _break + 60 );
    }
  }

  const breakDEC = () => {
    if ( breakTime > 1 ) {
      setBreakTime( breakTime - 1 )
      setBreak( _break - 60 );
    }
  }


  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <Timer />
      <BreakController />
      <SessionController />
      <Audio 
        audio={audio}
      />
    </div>
  );
};

render(<App />, document.getElementById("root"));
