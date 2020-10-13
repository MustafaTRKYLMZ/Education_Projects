// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'


const Blog = ({ blog,handleLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
 

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <div>
      <tr style={hideWhenVisible} key={blog.id}>
        <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link>
        <button className='viewButton' onClick={toggleVisibility}>view </button>
      </tr>

      <tr className='blogHeader' style={showWhenVisible} >{blog.title} by author {blog.author}
        <button className='hideButton'  onClick={toggleVisibility}> hide </button><br/>
      </tr>

      <tr className='blogUrl' style={showWhenVisible} >Adress  : {blog.url} <br/></tr>
      <tr className='blogLikes'style={showWhenVisible}>Likes   :  {blog.likes} <button className="likeButton"  onClick={() => handleLike(blog.id)}>like</button><br/></tr>
      <tr className='blogName' style={showWhenVisible} >Username: {blog.user.name}<br/></tr>
      {user !== null && user.name === blog.user.name &&
               <tr style={showWhenVisible} >
                 <button className='removeButton' onClick={ () => deleteBlog(blog.id)}>Delete</button>

               </tr>
      }
    </div>
  )
}


export default Blog