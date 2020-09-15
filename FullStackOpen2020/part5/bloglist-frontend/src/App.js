import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Info from './components/Info'
//import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage,setInfoMessage]=useState(null)
  const blogFormRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const setBlogsSort = (newBlogs) => {
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }

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

  const handleLogin = async (event) => {
     console.log('Wrong pasword')
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage({ text: 'username or password wrong', class: 'error' })

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )


  const blogForm = () => (
    <Togglable buttonLabel='new Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
  const logOut=() => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(user.token)
  }



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
        <h2 >Blog Application</h2>
      </div>

      <Notification message={errorMessage} />
      <Info message={infoMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p className='login'>{user.name} logged in  <button className='buton' onClick={logOut}>logout</button></p>
          {blogForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App