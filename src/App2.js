// import logo from './logo.svg';
import './app2.css';
// import { render } from '@testing-library/react';
import React from 'react';
import sound from './src_short_sms_7.mp3'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      session:1500,
      setSession:25,
      break:5,
      seconds:0,
      isToggleOn:true,
      minutes:25,
      countDown:1,
      isBreak:false
    }
    
    this.handleBreakDecrement=this.handleBreakDecrement.bind(this);
    this.handleBreakIncrement=this.handleBreakIncrement.bind(this);
    this.handleSessionDecrement=this.handleSessionDecrement.bind(this);
    this.handleSessionIncrement=this.handleSessionIncrement.bind(this);
    this.handleReset=this.handleReset.bind(this);
    this.handleStart=this.handleStart.bind(this);
    this.handlePlay=this.handlePlay.bind(this);
  }

  handleBreakIncrement(event){
    if(this.state.break<60){
      this.setState({
        break:this.state.break+1
      })
    }
  }

  handleBreakDecrement(event){
    if(this.state.break>1){
      this.setState({
      break:this.state.break-1,
      
    })
    }
    
  }
  
  handleSessionIncrement(event){
    if(this.state.setSession<60){
      this.setState({
        session:this.state.session+60,
        setSession:this.state.setSession+1,
        minutes:this.state.minutes+1

      })
    }
  }
  
  handleSessionDecrement(event){
    if(this.state.setSession>1){
      this.setState({
        session:this.state.session-60,
        setSession:this.state.setSession-1,
        minutes:this.state.minutes-1
      })
    }
  }

  handleReset(){
    this.setState({
      session:1500,
      setSession:25,
      minutes:25,
      break:5,
      seconds:0,
      isToggleOn:true,
      isBreak:false
    })
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;;

    clearInterval(this.state.countDown);
  }

  handleStart(){
    
    this.setState({
      isToggleOn: !this.state.isToggleOn,
      session:this.state.session,
      
    });
    
    
    if (this.state.isToggleOn === false){
      console.log("it's pause");
      clearInterval(this.state.countDown);
    } else {
      // console.log("it's start",this.state.session);
    
      const checkInterval = setInterval( () => {
        if(this.state.session === 0){
          document.getElementById('playAudio').click();
          
          this.setState ({
            session: this.state.isBreak? this.state.setSession*60 : this.state.break*60,
            isBreak:!this.state.isBreak        
          });
          
        } else {
          this.setState ({
            session: this.state.session-1,
        
          })
        }}
        
        , 1000);
      

      this.setState({
          countDown:checkInterval
      })
    }
    console.log(this.state.isToggleOn, this.state.countDown);
       
  }

  handlePlay(){
    document.getElementById("beep").play();
  }

  render(){
    return(
      <div className="big-container">
        <button style={{display:"none"}} id="playAudio"  onClick={this.handlePlay}> 
              <audio id="beep" src={sound} type="audio/mpeg"/>
        </button>
       
        <div className="count-down">
          <div id="timer-label">{this.state.isBreak ? 'ENJOY YOUR BREAK' : 'FOCUS TIME'}</div>
          <time id="time-left">{Math.floor(this.state.session/60) > 9? Math.floor(this.state.session/60) : `0${Math.floor(this.state.session/60)}`}:{this.state.session % 60 > 9? this.state.session % 60 : `0${this.state.session % 60}`}</time>
          {/* <time id="time-left">{this.state.minutes > 9? this.state.minutes : `0${this.state.minutes}`}:{this.state.seconds > 9? this.state.seconds : `0${this.state.seconds}`}</time> */}
          <div className='buttons'>
            <button id="start_stop"onClick={this.handleStart}>{this.state.isToggleOn ? 'START' : 'PAUSE'}</button>
          <button id="reset" onClick={this.handleReset}>reset</button>
          </div>
          
        </div> 
        
        <div className="edit-value">
          <div className="edit-label">Change Session or Break Length:</div>
          
          <div className='edit-session'>
            <div id="session-label">SESSION LENGTH</div>
            <div id="session-length">{this.state.setSession}</div>
            <button id="session-increment" onClick={this.handleSessionIncrement}>more</button>
            <button id="session-decrement" onClick={this.handleSessionDecrement}>less</button>
                    
          </div>

          <div className='edit-break'>
            <div id="break-label">Break Length (minutes)</div>
            <div id="break-length">{this.state.break}</div>
            <button id="break-increment" onClick={this.handleBreakIncrement}>more</button>
            <button id="break-decrement" onClick={this.handleBreakDecrement}>less</button>
          </div>
        </div>
      </div>
     
    )
  }
}

export default App;