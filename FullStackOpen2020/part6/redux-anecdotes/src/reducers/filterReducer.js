const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'FILTER':
          
        return action.filter
      default:
        return state
    }
  }
  

export const newFilter =(filter) =>{
    return {
        type:'FİLTER',
        filter,
    }
    //action
}
export default filterReducer