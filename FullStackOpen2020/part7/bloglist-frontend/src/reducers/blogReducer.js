import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]//asObject(action.data.content)]//state.concat(action.data)

  case 'INIT_BLOG':
    return action.data.sort((a, b) => b.votes - a.votes)

  case 'LİKE_CHANGE':
    const changedBlog =action.data
    return state.map(blog =>
      blog.id !== changedBlog.id ? blog :changedBlog
    ).sort((a, b) => b.likes - a.likes)


  default:
    return state
  }

}
export const initializeBlogs = (blogs) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs,
    })

  }
}



export const createBlog = (content) => {
  return async dispatch => {
    const newBlogs = await blogService.createNew(content)
    dispatch({
      type: 'NEW_BLOG',
      data:newBlogs,
    })
  }
}

export const likeAdd = (anecdote) => {
  return async dispatch => {
    const newData = await blogService.updateData(anecdote)
    dispatch ({
      type: 'LİKE_CHANGE',
      data: newData
    })

  }
}

export default blogReducer