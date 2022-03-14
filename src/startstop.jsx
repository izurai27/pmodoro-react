function StartStop (props){
  if (props.value === 'pause'){
    return <div id="start_stop">pause</div>
  }
  return <div id="start_stop">start</div>
}

export default StartStop