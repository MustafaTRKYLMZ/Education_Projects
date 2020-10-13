import React from 'react'
import { Table, Form, Button } from 'react-bootstrap'

const BlogForm = ({ createNewBlog }) => {


  const addBlog = (event) => {
    event.preventDefault()
    const title= event.target.title.value
    const author=event.target.author.value
    const url= event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    createNewBlog ({ title, author, url })
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            name="title"
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            name="author"
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            name="url"
          />
          <Button id="createButton" type="submit" variant="primary">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm