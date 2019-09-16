const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(req, res, next) => {
  try {
    let users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    res.json(users.map(u => u.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    if (!body.password) {
      res.status(400).json({error: 'password missing'})
    }else if (body.password.length < 3) {
      res.status(400).json({error: 'password invalid'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      blogs: []
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
