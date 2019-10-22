import React, {useState, useEffect} from 'react'
import  { useField } from './hooks'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }else {
    return (<h1 className="message">{message}</h1>)
  }

}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  //blogform states
  const title = useField('text')//[title, setTitle] = useState('')
  const author = useField('text')//[author, setAuthor] = useState('')
  const url = useField('text')//[url, setUrl] = useState('')
  //user states
  const username = useField('text')
  const password = useField('text')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(b =>
        {
        b.sort((a,b) => b.likes - a.likes)
        setBlogs(b)
      })
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
      const user = await loginService.login({username: username.value, password: password.value})

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      username.reset()
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      username.reset()
      password.reset()
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    window.location.reload()
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
    <LoginForm
      username={username.value}
      password={password.value}
      handleUsernameChange={username.onChange}
      handlePasswordChange={password.onChange}
      handleLogin={handleLogin}
    />
  )

  const blogForm = () => (
    <div>
      <p>Logged in as {user.name}. <button type="submit" onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel="new blog">
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          blogPost={blogPost}
        />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map((b,i) => <Blog b={b} key={i} u={user} />)}
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
