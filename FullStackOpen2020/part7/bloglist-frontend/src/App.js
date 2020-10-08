import React, { useState } from 'react'
import Notification from './components/Notification'
import Info from './components/Info'

import Menu from './components/Menu'


const App = () => {
  const [infoMessage,setInfoMessage]=useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      <div>
        <h2 >Blog Application</h2>
        <Notification message={errorMessage} />
        <Menu setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage}/>
      </div>
      <Info message={infoMessage} />

    </div>
  )
}

export default App




/*
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setBlogsSort = (newBlogs) => {
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }

blogService.getAll().then(blogs =>
      //setBlogsSort( blogs ))
      setBlogs(blogs.sort((a, b) => b.likes - a.likes)))




const Menu = () => {
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
      // setBlogsSort( blogs )
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


    const Home = () => (
      <div> <h2>TKTL notes app</h2> </div>
    )

    return (
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/login">login</Link>
        </div>

        <Switch>
          <Route path="/blogs/:id">
            <BlogFace blog={blog} />
          </Route>
          <Route path="/users/:id">
            <User userFind={userFind}/>
          </Route >

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>

          <Route path="/users">
            <Users users={users}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </Router>
    )
  }




*/