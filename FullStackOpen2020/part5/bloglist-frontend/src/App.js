import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import Info from './components/Info'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage,setInfoMessage]=useState(null)
  const [title,setTitle]=useState([])
  const [author,setAuthor]=useState([])
  const [url,setUrl]=useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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



  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author:author,
      url:url,
      id: blogs.length + 1,
    }
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setInfoMessage(`a new blog ${blogObject.title} added`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
        setAuthor('')
        setTitle('')
        setUrl('')
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
 /* const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  */
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
   
  const blogForm = () => (
    <form onSubmit={addBlog}>
    <div>
        title:
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit" className='butonCreate'>create</button>
    </form>  
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
      <p className='login'>{user.name} logged in<button className='buton' onClick={logOut}>logout</button></p>
        {blogForm()}
    </div>
    }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      
    </div>
    
  )
}

export default App