import React, { useState, useImperativeHandle } from 'react'
import blogService from '../services/blogs'


import '../index.css'


const Blog = ({ blog,blogs,setBlogs,setMessage ,user}) => {
  const [visible, setVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (id) => {
    const blogLikes = blogs.find(b => b.id === id)
    blogService.update({
      id: blogLikes.id,
      user: blogLikes.user,
      url: blogLikes.url,
      title: blogLikes.title,
      author: blogLikes.author,
      likes: blogLikes.likes + 1
    })
      .then(updatedBlog => {
        let newBlogs = [...blogs]
        newBlogs[blogs.indexOf(blog)] = updatedBlog
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        setMessage({ text: `${error.response.data.error}`, class: 'error' })
      })
  }

  const deleteBlog=(id)=>{
    
      const blogDelete = blogs.find(b => b.id === id)
      if (window.confirm(`Do you want to delete '${blogDelete.title}' by '${blogDelete.author}'?`)) {
        blogService
          .deleteOneBlog(id).then(response => {
            setMessage({ text: `Deleted '${blogDelete.title}' by '${blogDelete.author}'`, class: 'info' })
            setBlogs(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))
            
          })
          .catch(error => {
            setMessage({ text: `${error.response.data.error}`, class: 'error' })
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
      }
     // setVisible(!visible)
    
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogDetails=()=>{

   return (
         <div>
            <div>{blog.title} by author {blog.author}<button style={showWhenVisible} onClick={toggleVisibility}> hied </button><br/> </div> 
            <div>Adress  : {blog.url} <br/></div>
            <div>Likes   :  {blog.likes} <button style={showWhenVisible} onClick={() => handleLike(blog.id)}>like</button><br/></div>  
            <div style={showWhenVisible} >Username: {blog.user.name}<br/></div> 
              {user !== null && user.name === blog.user.name &&
               <div style={showWhenVisible} >
                 <button className='removeButton' onClick={()=>deleteBlog(blog.id)}>Delete</button>
            
               </div>  
              }   
       </div>
       )
  }
  const firstBlog=()=>{

  return (
        <div style={hideWhenVisible} >
           {blog.title} {blog.author}
              <button onClick={toggleVisibility}>view </button>
        </div>
      )
  }
  

  return (
    <div style={blogStyle}>
       {visible === true ? blogDetails():firstBlog()}
    </div>

)}
  

export default Blog
