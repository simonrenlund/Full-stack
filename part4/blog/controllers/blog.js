const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async(req, res, next) => {
  try {
    const blogs = await Blog
      .find({}).populate('user',{username: 1, name: 1})
    res.json(blogs.map(b => b.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogRouter.get('/:id', async(req, res, next) => {
  try {
    const blog = await Blog
      .findById(req.params.id).populate('user',{username: 1, name: 1})
    if (blog) {
      res.json(blog.toJSON())
    } else {
      next()
    }
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async(req, res, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog(req.body)

    const user = await User.findById(decodedToken.id)
    blog.user = user.id
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()

    res.status(201).json(blog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async(req, res, next) => {
  try {
    const blog = await Blog
      .findByIdAndRemove(req.params.id)
    if (blog) {
      res.status(204).end()
    } else {
      next()
    }
  } catch(exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async(req, res, next) => {
  try {
    const blog = {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes
    }
    const updatedBlog = await Blog
      .findByIdAndUpdate(req.params.id, blog, {new: true})
    res.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter
