import React from 'react'
import { Link } from 'react-router-dom'





export const User = ({ userFind,user }) => {
  if (!userFind) {
    return null
  }

  return (
    <div>
      <div>
        {user?
          <h1>{userFind.username}</h1>:''
        }
      </div>
      <div>
        {user?
          <h1>added blogs</h1>:''
        }
      </div>
      <div>
        <ul>{user?
          <ul>
            {userFind.blogs.map(blog => <li key={blog.id}>  {blog.title}</li>)}
          </ul>:''
        }
        </ul>

      </div>
    </div>
  )

}

const Users = ({ users,user } ) => {


  return (
    <div>
      <h1>Users</h1>
      {user?<table>
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
      </table>:''
      }


    </div>
  )
}

export default  Users