import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {voteAdd} from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {

   
  return(
    <div >
    {anecdote.content}  <br/>
    has {anecdote.votes} {anecdote.try}<button onClick={handleClick} >vote</button>
     
    </div>

  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(voteAdd(anecdote.id))
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes