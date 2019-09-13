import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }else {
    return (<h1>{message}</h1>)
  }

}

const Blogs = ({blogs}) => {
  const blogMap = () => blogs.map((b,i) => <Blog blog={b} key={i} />)
  return(<div>{blogMap()}</div>)
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
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

  const loginForm = () => (
    <div>
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
    </div>
  )

  const blogForm = () => (
    <p>Logged in.</p>
  )

  return(
    <div>
      <Notification message={errorMessage} />
      <h1>Bloglist frontend</h1>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App;
