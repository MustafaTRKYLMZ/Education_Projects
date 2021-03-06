import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handClick,text}) => (
  
  <button onClick={handClick}>
    {text}
  </button>
)

 



  


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote]= useState(new Array(6).fill(0))  
 
  const choise = () => {
    const leng = anecdotes.length-1
    const number =Math.floor(Math.random() *leng)
   setSelected(number)
  }

const points =()=>{
  const updatedVote= [...vote]
  updatedVote[selected]+=1
  setVote(updatedVote)
}

const maxVoteIndex =()=>{
  const max= Math.max(...vote)
  return vote.indexOf(max)
} 

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button handClick={points} text="vote"/>
      <Button handClick={choise} text="next anecdote"/>
     
      <p>{props.anecdotes[maxVoteIndex()]} </p>   
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)