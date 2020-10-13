import React, { useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import BlogFace from '../components/BlogFace'
import Login from '../components/Login'
import Register from '../components/Register'
import {
  Switch, Route, Link, useRouteMatch,useHistory
} from 'react-router-dom'
import Users from '../components/Users'
import { User }  from '../components/Users'
import Blogs from '../components/Blogs'

import { stayLogin } from '../reducers/userReducer'  
import { initializeBlogs } from '../reducers/blogReducer'
import { initialiseUsers } from '../reducers/userListReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../reducers/userReducer'


const Menu = ({ setErrorMessage, setInfoMessage }) => {
  const dispatch = useDispatch()
  const blogs =useSelector(state => state.blogs)//((a, b) => b.likes - a.likes))
  const users = useSelector (state => state.users)
  const user = useSelector(state =>  state.user)


  useEffect(() => {

    dispatch(stayLogin())
    dispatch(initializeBlogs())//blogStore.sort((a, b) => b.likes - a.likes))
    dispatch(initialiseUsers())
  }, [dispatch])


  const matchFirst = useRouteMatch('/users/:id')
  const userFind = matchFirst
    ? users.find(user => user.id === matchFirst.params.id)
    : null

  const padding = {
    padding: 5
  }


  const LogOut = () => {
    try {
      dispatch(logOutUser())
    } catch (e) {
      setErrorMessage(e,'Logout unsuccesfull')
    }
  }

  const matchSecond = useRouteMatch('/blogs/:id')
  const blog = matchSecond? blogs.find(blog => blog.id === matchSecond.params.id)
    : null


  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              {user? <Link style={padding} to="/blogs">blogs</Link>:''}
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user?<Link style={padding} to="/users">users</Link>:''}
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user? <em>{user.username} logged in <button className='buton' onClick={LogOut}>logout</button> </em>
                :
                <Link style={padding} to="/login">login</Link>}
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user? '':<Link style={padding} to="/register">register</Link>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/blogs/:id">
          <BlogFace blog={blog} user={user} setErrorMessage={setErrorMessage} />
        </Route>
        <Route path="/users/:id">
          <User userFind={userFind} user={user}/>
        </Route >
        <Route path="/login">
          <Login setErrorMessage={setErrorMessage} user={user} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/blogs">
          <Blogs  setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage} user={user} />
        </Route>
        <Route path="/users">
          <Users user={user}/>
        </Route>
       
      </Switch>
    </div>
  )
}
export default Menu