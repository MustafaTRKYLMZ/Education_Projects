
const initialNotification = null

const asObject = (notification) => {
  return {
    message:notification
  }
}
const initialState = asObject(initialNotification)

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    const newState = asObject(action.data)
    return newState
  case 'CLEAR_NOTIFICATION':
    const nullState = asObject(action.data)
    return nullState
  default:
    return state
  }
}
const timeManage = time => new Promise(ls => setTimeout(ls, time))

export const makeNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type:'NEW_NOTIFICATION',
      data:message
    })
    setTimeout(() => {
      dispatch({
        type:'CLEAR_NOTIFICATION',
        data:null
      })
    },time*1000)
  }
}

export default notificationReducer