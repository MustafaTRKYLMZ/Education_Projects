import userService from '../services/users'

export const getAll = () => {
  return async dispatch => {
    const userList = await userService.getAll()
    dispatch(setUserList(userList))
  }
}
export const setUserList = (userList) => {
  return {
    type:'SET_USER_LIST',
    data:userList
  }
}

const userListReducer = (state = null,action) => {
  switch(action.type){
  case 'SET_USER_LIST':
    return action.data
  default:
    return state
  }
}

export default userListReducer