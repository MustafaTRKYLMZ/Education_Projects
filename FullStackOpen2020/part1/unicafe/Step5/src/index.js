import React, {useState} from 'react'
import ReactDOM from 'react-dom'



const Statistic = (props) => {
if(props.text==="positive"){
  return (
    <div>
      <p>{props.text} {props.value}%</p>

    </div>
  )
}
  return (
    <div>
      <p>{props.text} {props.value}</p>

    </div>
  )
  
}

const Statistics = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral
  const all= good+bad+neutral
  const average = (good-bad)/all
  const positive= (good*100)/all

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <Statistic text="good" value ={good} />
      <Statistic text="neutral" value ={neutral} />
      <Statistic text="bad" value ={bad} />
      <Statistic text="all" value ={all} />
      <Statistic text="average" value ={average} />
      <Statistic text="positive" value ={positive}/>
     
    </div>
  )
}

const Button = ({handClick,text}) => (
  
  <button onClick={handClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const increaseGoodOne = () => {
    setAll(allClicks+1)
    setGood(good+1)
  }
  const increaseNeutralOne = () => {
    setAll(allClicks+1) 
    setNeutral(neutral+1)
  }
  const increaseBadOne = () => {
    setAll(allClicks+1) 
    setBad(bad+1)
  }
 

  return (
    <div>
    <h1>give feedback</h1>
      <Button handClick={increaseGoodOne} text="good"/>
      <Button handClick={increaseNeutralOne} text="neutral"/>
      <Button handClick={increaseBadOne} text="bod"/>
      
      <Statistics good={good}bad={bad}neutral={neutral}/>
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))