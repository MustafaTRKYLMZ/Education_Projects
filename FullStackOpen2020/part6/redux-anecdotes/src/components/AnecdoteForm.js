import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, clearNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
   
    event.target.anecdote.value = ''
    

    dispatch(createAnecdote(content))
    dispatch(newNotification(`Created anecdote '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
   
    <form onSubmit={addAnecdote}>
       <h2>create New</h2>
      <input name="anecdote" /><br/>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm