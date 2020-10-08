// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'


const Blog = ({ blog,handleLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <div className='blog' style={blogStyle} >
      <div style={hideWhenVisible} key={blog.id}>
        <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link>
        <button className='viewButton' onClick={toggleVisibility}>view </button>
      </div>

      <div className='blogHeader' style={showWhenVisible} >{blog.title} by author {blog.author}
        <button className='hideButton'  onClick={toggleVisibility}> hide </button><br/>
      </div>

      <div className='blogUrl' style={showWhenVisible} >Adress  : {blog.url} <br/></div>
      <div className='blogLikes'style={showWhenVisible}>Likes   :  {blog.likes} <button className="likeButton"  onClick={() => handleLike(blog.id)}>like</button><br/></div>
      <div className='blogName' style={showWhenVisible} >Username: {blog.user.name}<br/></div>
      {user !== null && user.name === blog.user.name &&
               <div style={showWhenVisible} >
                 <button className='removeButton' onClick={ () => deleteBlog(blog.id)}>Delete</button>

               </div>
      }
    </div>
  )
}


export default Blog