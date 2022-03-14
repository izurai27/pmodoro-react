
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
  const [timeCount, setTimeCount] = useState(sessionLength*60);
  const [started, setStarted] = useState(false);
  const [action,setAction] = useState('play')
  const [timerLabel,setTimerLabel] = useState('Session Time')
  
  // const changeLength = (action,target) => {
  //   if(target === 'session'){
  //     if (sessionLength>1 && sessionLength<60){
  //       switch(action) {
  //         case "increment" :  setSessionLength(sessionLength + 1); 
  //                             setTimeCount(timeCount + 60);
  //                             break
  //         case "decrement" :  setSessionLength(sessionLength - 1); 
  //                             setTimeCount(timeCount - 60);
  //                             break
  //         default : break;
  //       }
        
  //     }
  //   } else if (target === "break"){
  //     if (breakLength>1 && breakLength<60){
  //       switch(action) {
  //         case "increment" : setBreakLength(breakLength + 1); 
  //                            break
  //         case "decrement" : setBreakLength(breakLength - 1); 
  //                            break
  //         default : break;
  //       }
        
  //     }
  //   }
  // }

  useEffect(() => {
    let intervalID;
    
    if (started) {
      setAction('pause')
      
      console.log(timeCount);

      if(timeCount < 0) {
        if(timerLabel === 'Break Time') {
          setTimerLabel('Session Time');
          setTimeCount(sessionLength*60);
          // console.log('label: '+timerLabel )
        } else {
          setTimerLabel('Break Time')
          setTimeCount(breakLength*60)
          
          // console.log('label: '+timerLabel )
        }
      }

      intervalID = setInterval(() => {
        setTimeCount(timeCount => timeCount-1);
        console.log('label: '+timerLabel, ', timeCount: '+ timeCount,'breaklength: '+breakLength )
      }, 100);

    } else {
      clearInterval(intervalID);
      setAction('play')
    }
    return () => clearInterval(intervalID);
  }, [started, timeCount, breakLength, sessionLength, timerLabel]);

  
  return (
    <div className="App">
      <div>Pomodoro App</div>

      <div id="timer-label">{timerLabel}</div>
      <TimeLeft time={timeCount}/>
      <div id="start_stop" onClick={() => setStarted(!started)}>{action}</div>
      
      <div id="reset" 
            onClick={() => {
              setStarted(false);
              setBreakLength(defaultBreakLength);
              setSessionLength(defaultSessionLength);
              setTimeCount(defaultSessionLength*60);
              setTimerLabel('Session Time')
              }}>reset</div>
     
      <div className="editSessionBreak">
        <div className='breakGroup'>
          <div id="break-label">Break Length</div>
          <Length id="break-length" value={breakLength}/>
          <div id="break-increment" onClick={() => {if (breakLength < 60) setBreakLength(breakLength + 1)}}>+</div>
          <div id="break-decrement" onClick={() => {if (breakLength > 1) setBreakLength(breakLength - 1)}}>-</div>
        </div>

        <div className='sessionGroup'>
          <div id="session-label">Session Length</div> 
          <Length id="session-length" value={sessionLength}/>
          <div id="session-increment" onClick={() => {if (sessionLength<60) {setSessionLength(sessionLength + 1); setTimeCount(timeCount => timeCount + 60)}}}>+</div>
          <div id="session-decrement" onClick={() =>  {if (sessionLength>1) {setSessionLength(sessionLength - 1); setTimeCount(timeCount => timeCount - 60)}}}>-</div>
        </div>
      </div>
    </div>
  );
}

export default App;

