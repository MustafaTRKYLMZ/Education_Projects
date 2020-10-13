import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import userListReducer from './reducers/userListReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationreducer'

const reducer = combineReducers({
  blogs: blogReducer,
  users: userListReducer,
  user:userReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
