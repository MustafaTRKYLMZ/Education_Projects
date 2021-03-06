import React, {useState} from 'react'
import ReactDOM from 'react-dom'





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

  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>Average {average}</p>
      <p>positive {positive} %</p>

    </div>
  )
  
}

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
      <button onClick={increaseGoodOne}>good</button>
      <button onClick={increaseNeutralOne}>neutral</button>
      <button onClick={increaseBadOne}>bad</button>
      
      <Statistics good={good}bad={bad}neutral={neutral}/>
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))