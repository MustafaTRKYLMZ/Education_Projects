import React, { useState } from 'react'
import blogService from '../services/blogs'


export const BlogFace = ({ blog,user,blogs,setBlogs,setErrorMessage }) => {

  const [comment,setComment]=useState([])

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
        newBlogs[blogs.indexOf(blogLikes)] = updatedBlog

        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        setErrorMessage({ text: `${error.response.data.error}`, class: 'error' })
      })
  }


  const addComment = (event) => {
    event.preventDefault()
    // addNewComment ({
    //  comment: comment,
    // })

    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>Blog App</h3>
      {user?<div>
        <h1>{blog.title} {blog.author}</h1>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button  onClick={() => handleLike(blog.id)} >like</button></p>
        <p>added by {blog.user.username}</p>

      </div>:'' }
      <div>
        {user?<h3>Comments</h3>:'' }
        {user?
          <form onSubmit={addComment}>
            <div>
              <input
                id="comment"
                type="text"
                value={comment}
                name="comment"
                onChange={({ target }) => setComment(target.value)}
              /><button id="commentAddButton" type="submit" className='butonCreate'>Add Comment</button>
            </div>
          </form>:'' }
        <div>
          <ul>
            {user? <li>
              {blog.comments}
            </li>:'' }
          </ul>
        </div>
      </div>
    </div>
  )

}


export default  BlogFace