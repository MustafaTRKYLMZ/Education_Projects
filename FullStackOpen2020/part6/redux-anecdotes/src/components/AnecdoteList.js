import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {voteAdd} from '../reducers/anecdoteReducer'
import { newNotification, clearNotification} from '../reducers/notificationReducer'

function Anecdote({ anecdote, handleClick}) {


  return (
    <div>
      {anecdote.content}  <br />
    has {anecdote.votes} <button onClick={handleClick}>vote</button>

    </div>

  )
}

const Anecdotes = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state =>//state.anecdotes)
      state.anecdotes.filter(n =>n.content.toLowerCase().includes(state.filter.toLowerCase())))



const voteUpdate=(id)=>{
  dispatch(voteAdd(id))
  dispatch(newNotification(`Voted anecdote '${anecdotes.find(a => a.id === id).content}'`))
  setTimeout(() => {
    dispatch(clearNotification())
  }, 5000)
}

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            voteUpdate(anecdote.id)
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes