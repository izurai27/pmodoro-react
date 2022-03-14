import './length.css'


function Length (props){
  if(props.value>60 ){
    return <div className='length' id={props.id}>60</div>
  } else if (props.value<1){
    return <div className='length' id={props.id}>1</div>
  }
  return <div className='length' id={props.id}>{props.value}</div>
}

export default Length;