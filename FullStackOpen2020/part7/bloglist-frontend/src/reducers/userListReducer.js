import userService from '../services/users'
/*
export const getAll = () => {
  return async dispatch => {
    const userList = await userService.getAll()
    dispatch(setUserList(userList))
  }
}
*/
export const initialiseUsers = () => {

  return async dispatch =>  {
    const users= await userService.getAll()
    dispatch ({
      type:'INIT_USER',
      data:users
    })
  }
}

const userListReducer = (state = [],action) => {
  switch(action.type){
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}

export default userListReducer