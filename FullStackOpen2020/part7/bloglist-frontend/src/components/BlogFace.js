import React, { useState } from 'react'
import blogService from '../services/blogs'
import { makeNotification } from '../reducers/notificationreducer'
import { likeAdd,addComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form, Button } from 'react-bootstrap'



const BlogFace = ({ user,blog, setErrorMessage }) => {
  const blogs =useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const [comment,setComment]=useState([])

  const handleLike = (id) => {
    const blogLikes = blogs.find(b => b.id === id)

    dispatch(likeAdd( {
      id: blogLikes.id,
      user: blogLikes.user,
      url: blogLikes.url,
      title: blogLikes.title,
      author: blogLikes.author,
      comment:blogLikes.comment,
      likes: blogLikes.likes + 1
    }))
    dispatch(makeNotification(`you blog '${blogs.find(a => a.id === id).title}'`))

  }

  const addNewComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment({ ...blogs,comments: { ...blogs.comment,comment:comment } }))
  }

  if (!blog) {
    return null
  }


  return (
    <div>
      <h3>Blog App</h3>
      {user?<Table striped>
        <tbody>
          <tr>{blog.title} {blog.author}</tr>
          <a href={blog.url}>{blog.url}</a>

          <tr>{blog.likes} likes <Button  variant="primary" onClick={() => handleLike(blog.id)} >like </Button></tr>
          <tr>added by {blog.user.username}</tr>
        </tbody>
      </Table>:'' }
      <div>
        {user?<p className="h3">Comments</p>:'' }
        {user?
          <Form onSubmit={addNewComment}>
            <Form.Group>
              <Form.Control
                id="comment"
                type="text"
                value={comment}
                name="comment"
                onChange={({ target }) => setComment(target.value)}
              /> <Button variant="primary" id="commentAddButton" type="submit" >Add Comment</Button>
           
            </Form.Group>
          </Form>:'' }
        <div>
          <ul>{user?
            <ul>
              {//{blog.comments.map(comment => <li key={comment.id}>  {comment.content}</li>)}
              }
            </ul>:''
          }
          </ul>

        </div>

      </div>
    </div>
  )

}


export default  BlogFace


/*
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

        dispatch(newBlogs.sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        setErrorMessage({ text: `${error.response.data.error}`, class: 'error' })
      })
  }*/