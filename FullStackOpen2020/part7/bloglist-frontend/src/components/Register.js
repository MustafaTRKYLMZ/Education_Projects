
import React, { useState } from 'react'

import blogService from '../services/blogs'
import loginService from '../services/login'
import RegisterForm from './RegisterForm'
import Togglable from './Togglable'
import { useHistory } from 'react-router-dom'

const Register = ({ setUser, setErrorMessage, user } ) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()


  const handleRegister = async (event) => {

    console.log('Handle Register')
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
      history.push('/blogs')

    } catch (exception) {
      setErrorMessage({ text: 'username or password wrong', class: 'error' })

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const RegisterForm = () => (
    <Togglable buttonLabel='login'>
      <RegisterForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleRegister}
      />
    </Togglable>
  )


  return (

    <div>
      <h2>Register</h2>
      <div>
        <form >
          <div>
          username
            <input
              id='username'
              value={username}
            //onChange={handleUsernameChange}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              //  onChange={handlePasswordChange}
            />
          </div>
          <button id='login-button' type="submit">Register</button>
        </form>

      </div>
    </div>
  )

}

export default Register

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