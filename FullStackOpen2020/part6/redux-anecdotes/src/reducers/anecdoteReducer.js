import anecdoteService from '../services/anecdotes'
//import anecdoteService from './services/anecdotes'

/*
const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}
*/
const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]//asObject(action.data.content)]//state.concat(action.data)

    case 'INIT_ANECDOTES':
        return action.data.sort((a, b) => b.votes - a.votes)

    case 'VOTE_CHANGE':
    
      const changedAnecdote =action.data
      return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote :changedAnecdote
        ).sort((a, b) => b.votes - a.votes)

    
    default:
      return state
  }
  
}
export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ 
      type: 'INIT_ANECDOTES',
      data: anecdotes,
      })
   
  }
}



export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
    data:newAnecdote,
    })
  }
}

export const voteAdd = (anecdote) => {
  return async dispatch => {
    const newData = await anecdoteService.updateData(anecdote)
    dispatch ({
      type: 'VOTE_CHANGE',
      data: newData
    })
    
  }
}

export default anecdoteReducer