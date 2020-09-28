import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { makeNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
 
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
/*
    dispatch(createAnecdote(content))
    dispatch(newNotification(`Created anecdote '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)*/
  }

  return (
   
    <form onSubmit={addAnecdote}>
       <h2>create New</h2>
      <input name="anecdote" /><br/>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addAnecdote: (content) => {
      dispatch(createAnecdote(content))
      dispatch(makeNotification(`You created anecdote '${content}'`, 5))
    },
  }
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm