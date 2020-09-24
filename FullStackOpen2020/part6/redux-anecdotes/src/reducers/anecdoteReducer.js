import anecdoteService from '../services/anecdotes'


/*
*/

//const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
   // id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)



const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, asObject(action.data.content)]//state.concat(action.data)

      case 'INIT_ANECDOTES':
        return action.data

    case 'VOTE_ADD':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, votes:anecdoteToChange.votes+1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      ).sort((a, b) => b.votes - a.votes)
    
    default:
      return state
  }
  
}
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}



export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
   
  }
}

export const voteAdd = (id) => {
  return {
    type: 'VOTE_ADD',
    data: { id }
  }
}

export default anecdoteReducer