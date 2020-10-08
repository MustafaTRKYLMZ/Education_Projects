import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

import BlogFace from '../components/BlogFace'
import Login from '../components/Login'
import Register from '../components/Register'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'

import Users from '../components/Users'
import { User }  from '../components/Users'
import Blogs from '../components/Blogs'
import axios from 'axios'



const Menu = ({ setErrorMessage, setInfoMessage }) => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])

  console.log(' App users component starting')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      console.log('After the login////////////////////////////////')

      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])


  useEffect(() => {
    axios
      .get('/api/users')
      .then(response => {
        setUsers(response.data)

      })
  }, [])

  const matchFirst = useRouteMatch('/users/:id')
  const userFind = matchFirst
    ? users.find(user => user.id === matchFirst.params.id)
    : null

  const padding = {
    padding: 5
  }

  const matchSecond = useRouteMatch('/blogs/:id')
  const blog = matchSecond
    ? blogs.find(blog => blog.id === matchSecond.params.id)
    : null

  const LogOut = () => {

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(user.token)
  }

  return (
    <Router>
      <div>
        {user? <Link style={padding} to="/blogs">blogs</Link>:''}
        {user?<Link style={padding} to="/users">users</Link>:''}
        {user? <em>{user.username} logged in <button className='buton' onClick={LogOut}>logout</button> </em>
          :
          <Link style={padding} to="/login">login</Link>}
        {user? '':<Link style={padding} to="/register">register</Link>}
      </div>

      <Switch>
        <Route path="/blogs/:id">
          <BlogFace blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
        </Route>
        <Route path="/users/:id">
          <User userFind={userFind} user={user}/>
        </Route >
        <Route path="/login">
          <Login setUser={setUser} setErrorMessage={setErrorMessage} user={user} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/blogs">
          <Blogs blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage} user={user} />
        </Route>
        <Route path="/users">
          <Users users={users} user={user}/>
        </Route>
      </Switch>
    </Router>
  )
}
export default Menu