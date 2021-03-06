const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('../utils/test_helper')

describe('DB tests', () => {
  beforeEach( async() => {
    await User.deleteMany({})
    const user = new User({ username: 'root', name: 'Superuser', password: 'sekret' })
    await user.save()
  })

  test('creation fails with proper statuscode and message if username already taken', async() => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
  test('creation succeeds with a fresh username', async() => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('Request tests', () => {
  test('GET request returns 200 and in json format', async() => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('A valid POST-request successfully creates a user', async() => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'asd',
      name: 'dsa',
      password: 'hunter2'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  })
  test('creation fails with proper status code if username or name is missing', async() => {
    badUser1 = {
      name: 'Superuser',
      password: 'salainen'
    }
    badUser2 = {
      username: 'root2',
      password: 'salainen'
    }
    await api
      .post('/api/users')
      .send(badUser1)
      .expect(400)
    await api
      .post('/api/users')
      .send(badUser2)
      .expect(400)
  })
  test('creation fails with proper status code if username is too short', async() => {
    badUser = {
      username: 'r',
      name: 'Superuser',
      password: 'salainen'
    }
    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })
  test('creation fails with proper status code if password is missing or too short', async() => {
    pwMissing = {
      username: 'root2',
      name: 'Superuser'
    }
    pwShort = {
      username: 'root3',
      name: 'Superuser',
      password: '12'
    }
    await api
     .post('/api/users')
     .send(pwMissing)
     .expect(400)

     await api
      .post('/api/users')
      .send(pwShort)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
