import React from 'react'
import {voteAdd} from '../reducers/anecdoteReducer'
import { makeNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux' 

function Anecdote({ anecdote, handleClick}) {


  return (
    <div>
      {anecdote.content}  <br />
    has {anecdote.votes} <button onClick={handleClick}>vote</button>

    </div>

  )
}

const Anecdotes = (props) => {
  const anecdotes = props.anecdotes.filter(n =>
    n.content.toLowerCase().includes(props.filter.toLowerCase()))


  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            props.voteUpdate(anecdote.id, props)
          }
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps =dispatch => {
return {
  vote:(id,props) =>{
    const anecdote = props.anecdotes.find(n => n.id ===id)
    dispatch(voteAdd({...anecdote,votes:anecdote.votes+1}))
    dispatch(makeNotification(`you voted anecdote '${props.anecdotes.find(a => a.id === id).content}'`,5))
  }
}
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
 mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdoteList
