
import React, { useState } from 'react'

import blogService from '../services/blogs'
import loginService from '../services/login'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { makeNotification } from '../reducers/notificationreducer'


const Login = ({ setErrorMessage } ) => {
  const dispatch = useDispatch()
  const user =useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()


  const handleLogin = async (event) => {

    console.log('Handle Login')
    event.preventDefault()
    try {
      const user = await dispatch(loginUser({ username, password }))
      dispatch(makeNotification(`Welcome ${user.username}`,5)
      )
      history.push('/blogs')

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


  return (

    <div>
      <div>
        {user === null ?
          loginForm() :''
        }
      </div>
    </div>
  )

}

export default Login

/*
  const setBlogsSort = (newBlogs) => {
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      console.log('seUser')
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