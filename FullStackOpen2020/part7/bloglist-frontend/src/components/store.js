import { createStore, combineReducers } from 'redux'
import blogReducer from '../reducers/blogReducer'
//import { composeWithDevTools } from 'redux-devtools-extension'
//import notificationReducer from '../reducers/notificationReducer'
//import filterReducer from'../reducers/filterReducer'


const reducer = combineReducers({
  anecdotes: blogReducer,
 // notification: notificationReducer,
 // filter:filterReducer
})
const store = createStore(reducer)

export default store