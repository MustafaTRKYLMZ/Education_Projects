// eslint-disable-next-line no-unused-vars
import React, { useState, useImperativeHandle } from 'react'
//import blogService from '../services/blogs'


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

  const blogDetails= () => {

    return (
      <div className='blog'>
        <div className='blogHeader'>{blog.title} by author {blog.author}
          <button className='hideButton' style={showWhenVisible} onClick={toggleVisibility}> hide </button><br/>
        </div>
        <div className='blogUrl'>Adress  : {blog.url} <br/></div>
        <div className='blogLikes'>Likes   :  {blog.likes} <button className="likeButton" style={showWhenVisible} onClick={() => handleLike(blog.id)}>like</button><br/></div>
        <div className='blogName' style={showWhenVisible} >Username: {blog.user.name}<br/></div>
        {user !== null && user.name === blog.user.name &&
               <div style={showWhenVisible} >
                 <button className='removeButton' onClick={ () => deleteBlog(blog.id)}>Delete</button>

               </div>
        }
      </div>
    )
  }

  const firstBlog= () => {

    return (
      <div style={hideWhenVisible} >
        {blog.title} {blog.author}
        <button className='viewButton' onClick={toggleVisibility}>view </button>
      </div>
    )
  }


  return (
    <div style={blogStyle}>
      {visible === true ? blogDetails():firstBlog()}
    </div>

  )}


export default Blog
