import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Blogs = ({blogs}) => {
  const blogMap = () => blogs.map(b => <Blog blog={b} />)
  return(<div>{blogMap()}</div>)
}


const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const allBlogs = blogService
      .getAll()
      .then(b =>
        setBlogs(b)
      )
  },[])

  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({username, password})

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return(
    <div>
      <h1>Bloglist frontend</h1>
      <p>Please login to continue.</p>
      <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
        <Blogs blogs={blogs} />
      </div>
  )
}

export default App;
