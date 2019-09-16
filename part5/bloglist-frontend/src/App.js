import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }else {
    return (<h1 className="message">{message}</h1>)
  }

}

const Blogs = ({blogs}) => {
  const blogMap = () => blogs.map((b,i) => <Blog blog={b} key={i} />)
  return(<div>{blogMap()}</div>)
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  //blogform states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  //user states
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
  }

  const blogPost = async(event) => {
    event.preventDefault()
    try {
      const blog = {
        "title": title,
        "author": author,
        "url": url,
      }
      const postedBlog = await blogService.create(blog)

      setErrorMessage(`Blog ${title} by ${author} successfully added.`)
      setBlogs(blogs.concat(postedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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
    <div>
      <p>Logged in as {user.name}. <button type="submit" onClick={handleLogout}>Logout</button></p>
      <h3>Create new blog.</h3>
      <form onSubmit={blogPost}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Post</button>
      </form>
      <h2>Blogs</h2>
      {blogs.map((b,i) => <Blog blog={b} key={i} />)}
    </div>
  )

  return(
    <div>
      <Notification message={errorMessage} />
      <h1>Bloglist frontend</h1>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App;
