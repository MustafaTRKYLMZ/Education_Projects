
import React, { useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'


const Blogs = ({ blogs, setBlogs, setErrorMessage, setInfoMessage, user }) => {

  const blogFormRef = useRef()


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setInfoMessage(`a new blog ${blogObject.title} added`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)

      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  const handleLike = (id) => {
    const blogLikes = blogs.find(b => b.id === id)
    blogService.update({
      id: blogLikes.id,
      user: blogLikes.user,
      url: blogLikes.url,
      title: blogLikes.title,
      author: blogLikes.author,
      likes: blogLikes.likes + 1
    })
      .then(updatedBlog => {
        let newBlogs = [...blogs]
        newBlogs[blogs.indexOf(blogLikes)] = updatedBlog

        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        setErrorMessage({ text: `${error.response.data.error}`, class: 'error' })
      })
  }

  const deleteBlog=(id) => {

    const blogDelete = blogs.find(b => b.id === id)
    if (window.confirm(`Do you want to delete '${blogDelete.title}' by '${blogDelete.author}'?`)) {
      blogService
      // eslint-disable-next-line no-unused-vars
        .deleteOneBlog(id).then(response => {
          setErrorMessage({ text: `Deleted ${blogDelete.title} by ${blogDelete.author}`, class: 'info' })
          setBlogs(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))

        })
        .catch(error => {
          setErrorMessage({ text: `${error.response.data.error}`, class: 'error' })
        })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <div>
        {user?blogForm():''
        }
        {user? <h2>New Blog</h2>:''}
      </div>
      {user?

        <div>
          {blogs.map((blog) =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} deleteBlog={deleteBlog} user={user} />
          )}
        </div>
        :'' }

    </div>

  )

}
export default Blogs

/*

  const setBlogsSort = (newBlogs) => {
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }


  console.log(' App users component starting')
  const hook = () => {
    axios
      .get('/api/users')
      .then(response => {
        setUsers(response.data)

      })
  }

  useEffect(hook, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
    blogService.getAll().then(blogs =>
      setBlogsSort( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

*/