const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res, next) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs.map(blog => blog.toJSON()))
    }).catch(error => next(error))
})

blogRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id).then(blog => {
    if (blog) {
      res.json(blog.toJSON())
    } else {
      next()
    }
  }).catch(error => next(error))
})

blogRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    }).catch(error => next(error))
})

blogRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id).then(result => {
    if (result) {
      res.status(204).end()
    } else {
      next()
    }
  }).catch(error => next(error))
})

blogRouter.put('/:id', (req, res, next) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }
  Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    .then(updatedBlog => {
      res.json(updatedBlog.toJSON())
    }).catch(error => next(error))
})

module.exports = blogRouter
