const blogs = [
  {
    title: 'asdasd',
    author: 'asdasdasd',
    like: 1337,
    url: 'http://xD.com',
    user: {
      username: 'SimppL',
      name: 'Simon',
      id: '5d7b5f534e0eaa5f68dc28dd'
    }
  },
  {
    title: 'asd',
    author: 'asda123',
    like: 1322,
    url: 'http://xD.com',
    user: {
      username: 'SimppL',
      name: 'Simon',
      id: '5d7b5f534e0eaa5f68dc28dd'
    }
  },
  {
    title: 'asd2',
    author: 'asda123',
    like: 1322,
    url: 'http://xD.com',
    user: {
      username: 'SimppL',
      name: 'Simon',
      id: '5d7b5f534e0eaa5f68dc28dd'
    }
  },
  {
    title: 'asd3',
    author: 'asda123',
    like: 1300,
    url: 'http://xD.com',
    user: {
      username: 'SimppL',
      name: 'Simon',
      id: '5d7b5f534e0eaa5f68dc28dd'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
