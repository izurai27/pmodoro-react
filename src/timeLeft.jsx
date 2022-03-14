function TimeLeft(props) {
  if (props.time<0){
    return <div id="time-left">00:00</div>
  }
  return (
    <div id="time-left">{Math.floor(props.time/60) > 9? Math.floor(props.time/60) : `0${Math.floor(props.time/60)}`}
    :
    {props.time % 60 > 9? props.time % 60 : `0${props.time % 60}`}</div>
  )
}

export default TimeLeft;