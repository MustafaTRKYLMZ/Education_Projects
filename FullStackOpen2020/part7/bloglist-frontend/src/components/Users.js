import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

export const User = ({ userFind,user }) => {
  console.log('User ',userFind)
  if (!userFind) {
    return null
  }

  return (
    <div>
      <div>
        {user?
          <h2>{userFind.username}</h2>:''
        }
      </div>
      <div>
        {user?
          <h1>added blogs</h1>:''
        }
      </div>
      <Table striped>
        {user? <tbody>
          {userFind.blogs.map(blog =>
            <tr key={blog.id}> <td>  {blog.title}</td></tr>)}
        </tbody>:''
        }
      </Table>
    </div>
  )

}

const Users = ({ user } ) => {

  const users = useSelector (state => state.users)


  return (
    <div>
      <h1>Users</h1>
      {user?<Table striped>
        <thead>
          <tr>
            <td></td>
            <td><h3>Blog Created</h3></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td> <Link to={`/users/${user.id}`}>{user.username}</Link> </td><td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>:''
      }

    </div>
  )
}

export default  Users