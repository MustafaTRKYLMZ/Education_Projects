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
      setErrorMessage('username or password wrong')
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
  const logOut=()=>{
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(user.token)
  }

  return (
    <div>
      <div>
         <h2 >Blog Aplication</h2>
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
        <Blog key={blog.id} blog={blog}  blogs={blogs} setBlogs={setBlogs} setMessage={setErrorMessage} user={user} />
      )}
    </div>
    
  )
}

export default App