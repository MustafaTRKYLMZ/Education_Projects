
import React, { useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { makeNotification } from '../reducers/notificationreducer'
import { likeAdd } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'

const Blogs = ({ setErrorMessage, setInfoMessage, user }) => {
  const blogs =useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    dispatch(createBlog(blogObject))
    // dispatch(makeNotification(`a new blog ${blogObject.title} added`,5))
    setInfoMessage(`a new blog ${blogObject.title} added`)
    setTimeout(() => {
      // dispatch()
      setInfoMessage(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel='new Blog' ref={blogFormRef}>
      <BlogForm createNewBlog={addBlog} />
    </Togglable>
  )


  const handleLike = (id) => {
    const blogLikes = blogs.find(b => b.id === id)

    dispatch(likeAdd( {
      id: blogLikes.id,
      user: blogLikes.user,
      url: blogLikes.url,
      title: blogLikes.title,
      author: blogLikes.author,
      comment:blogLikes.comment,
      likes: blogLikes.likes + 1
    }))
    // dispatch(makeNotification(`you blog '${blogs.find(a => a.id === id).title}'`))
    setInfoMessage(`you blog '${blogs.find(a => a.id === id).title}'likes`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 1000);
  }

  const delBlog=(id) => {
    /*
    const blogDelete = blogs.find(b => b.id === id)
    if (window.confirm(`Do you want to delete '${blogDelete.title}' by '${blogDelete.author}'?`)) {

      dispatch(deleteBlog(id))//There is a problem
        dispatch(makeNotification({ text: `Deleted ${blogDelete.title} by ${blogDelete.author}`, class: 'info' },5))
        dispatch(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))

      console.log('Bu blog silindi mesaj ile birlikte',blogDelete)
    }*/
  }


  return (
    <div>
      
      <div>
        {user?blogForm():''
        }
        {user? <h2>New Blog</h2>:''}
      </div>
      {user?
        <Table striped>
          <tbody>
            {blogs.map((blog) =>
            // eslint-disable-next-line indent
                <Blog key={blog.id} blog={blog} handleLike={handleLike} deleteBlog={delBlog} user={user} />
            )}
          </tbody>
        </Table>
        :'' }
    </div>
  )





}
export default Blogs



/*
      blogService
      // eslint-disable-next-line no-unused-vars
        .deleteOneBlog(id).then(response => {
          dispatch(makeNotification({ text: `Deleted ${blogDelete.title} by ${blogDelete.author}`, class: 'info' },5))
          dispatch(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))

        })
        .catch(error => {
          dispatch(makeNotification({ text: `${error.response.data.error}`, class: 'error' },5))
        })
        */

/*
    blogService.update({
      id: blogLikes.id,
      user: blogLikes.user,
      url: blogLikes.url,
      title: blogLikes.title,
      author: blogLikes.author,
      comment:blogLikes.comment,
      likes: blogLikes.likes + 1
    })
      .then(updatedBlog => {
        let newBlogs = [...blogs]
        newBlogs[blogs.indexOf(blogLikes)] = updatedBlog

        dispatch(newBlogs.sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        dispatch(makeNotification({ text: `${error.response.data.error}`, class: 'error' }))
      })
      */