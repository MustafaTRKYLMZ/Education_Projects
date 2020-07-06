import React, {useState} from 'react'
import ReactDOM from 'react-dom'



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 

  const increaseGoodOne = () => setGood(good+1)
  const increaseNeutralOne = () => setNeutral(neutral+1)
  const increaseBadOne = () => setBad(bad+1)
   
  const all= good+bad+neutral
  const average = (good-bad)/all
  const positive= (good*100)/all
  

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={increaseGoodOne}>good</button>
      <button onClick={increaseNeutralOne}>neutral</button>
      <button onClick={increaseBadOne}>bad</button>
      

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

ReactDOM.render(<App />, document.getElementById('root'))