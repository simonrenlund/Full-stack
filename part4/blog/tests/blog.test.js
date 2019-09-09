const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  }
]
beforeEach( async() => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('GET tests', () => {
  test('blogs are returned as json', async() => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('entries contatin an "id"', async() => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST tests', () => {
  test('correct POST-requests successfully create a new blog entry', async() => {
    const newBlog = {
      title: "123",
      author: "321",
      url: "http://xD.com",
      likes: 6
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.length).toBe(initialBlogs.length + 1)
  })
  test('likes default to 0 if missing from request', async() => {
    const newBlog = {
      title: "123",
      author: "321",
      url: "http://xD.com"
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body[res.body.length-1].likes).toBe(0)
  })
  test('undefined title or url equals res 400 from server', async() => {
    const blog1 = {
      author: "asd",
      url: "https://xD.com"
    }
    const blog2 = {
      title: "asd",
      author: "def"
    }
    const res1 = await api
      .post('/api/blogs')
      .send(blog1)
      .expect(400)
    const res2 = await api
      .post('/api/blogs')
      .send(blog2)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
