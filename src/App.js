
import './App.css';
import React, { useState, useEffect} from 'react';
import Length from './length'
import TimeLeft from './timeLeft';
// import StartStop from './startstop';

function App() {
  const defaultSessionLength = 25;
  const defaultBreakLength = 5;

  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
  const [timeCount, setTimeCount] = useState(defaultSessionLength*60);
  const [started, setStarted] = useState(false);
  const [action,setAction] = useState('play')
  const [timerLabel,setTimerLabel] = useState('Session time')
  

  useEffect(() => {
    let intervalID;
    
    if (started) {
      setAction('pause')
      
      if(timeCount < 0){
        (timerLabel === 'Session time')?  setTimeCount(breakLength*60-1) : setTimeCount(sessionLength*60-1)
       ;
        setTimerLabel('Break Time')
      }

      intervalID = setInterval(() => {
        setTimeCount(timeCount => timeCount-1);
        console.log(timeCount);
      }, 1000);
    } else {
      clearInterval(intervalID);
      setAction('play')
    }
    return () => clearInterval(intervalID);
  }, [started, timeCount, breakLength, sessionLength,timerLabel]);

  return (
    <div className="App">
      <title>Pomodoro App</title>

      <div id="timer-label">{timerLabel}</div>
      <TimeLeft time={timeCount}/>
      {/* <StartStop onClick={() => setStarted(true)} value={action}/> */}
      <div id="start_stop" onClick={() => setStarted(!started)}>{action}</div>
      
      <div id="reset" 
            onClick={() => {
              setStarted(false);
              setBreakLength(defaultBreakLength);
              setSessionLength(defaultSessionLength);
              setTimeCount(defaultSessionLength*60)
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

