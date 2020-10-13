import loginService from '../services/login'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'


export const stayLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('Log stay is starting')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('everyting allright',user)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      return user
    }
  }
}
export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser',JSON.stringify(user))
    dispatch(setUser(user))
    return user
  }
}


export const logOutUser = () => {//ACTİON AND FUNCTİON
  return async dispatch => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    dispatch(setUser(null))
    await blogService.setToken(user.token)
    window.localStorage.removeItem('loggedUser')
  }

}

export const setUser = (user) => {
  return {
    type:'SET_USER',
    data:user
  }
}


const userReducer = (state =null,action) => {
  switch(action.type){
  case 'SET_USER':
    return action.data

  default:
    return state
  }
}

export default userReducer