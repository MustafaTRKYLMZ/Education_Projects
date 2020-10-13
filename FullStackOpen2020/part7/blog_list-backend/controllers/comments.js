
const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
    

    const comments = await Comment
    .find({}).populate('comments', { title: 1, url: 1 })
    response.json(comments)
  })

  ////////////////////////////////////////////--------------------------------

  commentsRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blogs.findById(decodedToken.id)
  
    const comment = new Comment(request.body)
    comment.blog = comment.toJSON().id.toString()
    let result = await comment.save()
    await result.populate('comment', { name: 1, id: 1 }).execPopulate()
  
    blog.comments = blog.comments.concat(comment.toJSON().id.toString())
    await blog.save()
  
    response.status(201).json(result)
  })
  
  //--------------------------------------

module.exports = commentsRouter