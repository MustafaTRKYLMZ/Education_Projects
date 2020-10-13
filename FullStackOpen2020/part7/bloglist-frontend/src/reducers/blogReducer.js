import blogService from '../services/blogs'
import { makeNotification } from '../reducers/notificationreducer'


const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]

  case 'INIT_BLOG':
    return action.data

  case 'LİKE_CHANGE':
    // eslint-disable-next-line no-case-declarations
    const changedBlog = action.data
    return state.map(blog =>
      blog.id !== changedBlog.id ? blog :changedBlog
    ).sort((a, b) => b.likes - a.likes)
  case 'DELETE_BLOG':
    // eslint-disable-next-line no-case-declarations
    const deletedBlog = action.data
    return state.map(blog =>
      blog.id !== deletedBlog.id ? blog :deletedBlog
    ).sort((a, b) => b.likes - a.likes)
  case 'ADD_COMMENT':
    return [...state, action.data]
  default:
    return state
  }

}

export const addComment = () => {
  return async dispatch => {
    const commentBlogs = await blogService.update()
    dispatch ({
      type: 'ADD_COMMENT',
      data: commentBlogs
    })
  }
}

export const initializeBlogs = () => {
  //blogService.getAll().then(blogStore =>
  // dispatch(initializeBlogs(blogStore.sort((a, b) => b.likes - a.likes)))
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'INIT_BLOG',
      data: blogs,
    })
  }
}



export const createBlog = (blogObject) => {

  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeAdd = (blog) => {
  return async dispatch => {
    const newData = await blogService.update(blog)
    dispatch ({
      type: 'LİKE_CHANGE',
      data: newData
    })

  }
}

export const deleteBlog = ( id ) => {
  return async dispatch => {
    const newDeleted = await blogService.deleteOneBlog(id)
    dispatch({
      type:'DELETE_BLOG',
      data:newDeleted
    })
  
  }
}
export default blogReducer