import loginService from '../services/login'

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser',JSON.stringify(user))
    dispatch(setUser(user))
    return user
  }
}
export const setUser = (user) => {
  return {
    type:'SET_USER',
    data:user
  }
}

const userReducer = (state = null,action) => {
  switch(action.type){
  case 'SET_USER':
    return action.data
  default:
    return state
  }

}

export default userReducer