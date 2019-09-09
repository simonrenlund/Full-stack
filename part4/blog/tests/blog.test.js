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

describe('viewing all blog entries', () => {
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

describe('viewing a specific blog entry', () => {
  test('returns the correct blog entry as json', async() => {
    const res1 = await api
      .get('/api/blogs')
    const url = '/api/blogs/' + res1.body[0].id
    const res = await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body).toEqual(res1.body[0])
  })
})

describe('adding a new blog entry', () => {
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

describe('updating an entry', () => {
  test('updating an entry returns 200 and the updated object', async() => {
    updatedBlog =
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10
      }
    const all = await api
      .get('/api/blogs')
    const url = '/api/blogs/' + all.body[0].id
    const update = await api
      .put(url)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const updated = await api
      .get(url)
      .expect(200)
    expect(updated.body.likes).toEqual(updatedBlog.likes)
  })
})

describe('deleting a specific blog entry', () => {
    test('deleting an entry returns 204 and reduces the amount of entries by one', async() => {
      const all = await api
      .get('/api/blogs')
    const url = '/api/blogs/' + all.body[0].id
    const del = await api
      .delete(url)
      .expect(204)
    const all2 = await api
      .get('/api/blogs')
    expect(all2.body.length).toBe(all.body.length-1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
