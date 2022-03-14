function TimeLeft(props) {
  
  return (
    <time id="time-left">{Math.floor(props.time/60) > 9? Math.floor(props.time/60) : `0${Math.floor(props.time/60)}`}
    :
    {props.time % 60 > 9? props.time % 60 : `0${props.time % 60}`}</time>
  )
}

export default TimeLeft;