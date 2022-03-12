
import './App.css';
import React, { useState } from 'react';

function Length (props){
  if(props.value>60 ){
    return <div id={props.id}>60</div>
  } else if (props.value<1){
    return <div id={props.id}>1</div>
  }
  return <div id={props.id}>{props.value}</div>
}







function App() {
  const defaultSessionLength = 25;
  const defaultBreakLength = 5;

  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [breakLength, setBreakLength] = useState(defaultBreakLength);


  return (
    <div className="App">
      <title>Pomodoro App</title>

      <div id="timer-label">session</div>
      <div id="time-left">00:00</div>
      <div id="start_stop">start</div>
      <div id="reset" 
            onClick={() => {
              setBreakLength(defaultBreakLength)
              setSessionLength(defaultSessionLength)
              }}>reset</div>
     
      <div className="editSessionBreak">
        <div className='breakGroup'>
          <div id="break-label">Break Length</div>
          <Length id="break-length" value={breakLength}/>
          <div id="break-increment" onClick={() => setBreakLength(breakLength + 1)}>+</div>
          <div id="break-decrement" onClick={() => setBreakLength(breakLength - 1)}>-</div>
        </div>

        <div className='sessionGroup'>
          <div id="session-label">Session Length</div> 
          <Length id="session-length" value={sessionLength}/>
          <div id="session-increment" onClick={() => setSessionLength(sessionLength + 1)}>+</div>
          <div id="session-decrement" onClick={() => setSessionLength(sessionLength - 1)}>-</div>
        </div>

      </div>
            
      <div></div>
      <div></div>
    </div>
  );
}

export default App;

