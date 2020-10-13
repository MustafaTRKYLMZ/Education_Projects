
  
const notificationReducer = (state={content:'', messageTime:0}, action) => {
    switch (action.type) {
      case 'NEW_NOTIFICATION':
        return {content:action.content,messageTime:action.messageTime}
      case 'CLEAR_NOTIFICATION':
        if (action.msgTime === state.msgTime) {
          return { content: '', messageTime: 0 }
        } else {
          return state
        }
      /*  case 'ERROR_NOTIFICATION':
          if (action.msgTime === state.msgTime) {
            return { content: '', messageTime: 0 }
          } else {
            return state
          }*/
      default:
        return state
    }
  }
  const timeManage = time => new Promise(ls => setTimeout(ls, time));

  export const makeNotification = (content, timeSc) => {
    return async dispatch => {
      const messageTime = new Date().getTime()
      dispatch({
        type: 'NEW_NOTIFICATION',
        content,
        messageTime
      })
      await timeManage(timeSc * 1000);
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        messageTime
      })
    }
  }
  /*export const erorNotification =(content,timeSc) =>{
    return async dispatch =>{
      const messageTime = new Date().getTime()
      dispatch({
        type:'ERROR_NOTIFICATION',
        content,
        messageTime

      })
    }
  }*/
  
  export default notificationReducer