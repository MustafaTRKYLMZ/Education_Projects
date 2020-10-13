const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
 
  const blogs = await Blog.find({})
  .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
  
})
////////////////////////////////////////////--------------------------------

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(request.body)
  blog.user = user.toJSON().id.toString()
  let result = await blog.save()
  await result.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()

  user.blogs = user.blogs.concat(blog.toJSON().id.toString())
  await user.save()

  response.status(201).json(result)
})

//--------------------------------------
blogsRouter.post('/:id/comments', async (request, response,next) => {
  const body = request.body
  const id = request.params.id
  try{
    const blog = await Blog.findById(id)
    const comment = new Comment({
      content:body.content,
      blog:blog._id
    })
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.json(savedComment.toJSON())
  }catch(error){
    next(error)
}
})

//----------------------------------------------
blogsRouter.delete('/:id', async (request, response) => {
  
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user.toJSON().id.toString()){
    await Blog.findOneAndRemove(request.params.id)

    await User.updateOne({ _id: decodedToken.id }, { $pullAll: { blogs: [request.params.id] } })
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'only allowed to delete own blogs' })
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const body = request.body

  const blogChange = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, blogChange, { runValidators: true, new: true, context: 'query' }
  ).populate('user', { username: 1, name: 1, id: 1 })
  response.json(updatedBlog)
})



blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

  module.exports = blogsRouter


