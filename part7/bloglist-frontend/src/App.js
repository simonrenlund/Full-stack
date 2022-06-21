import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import {
  setSuccessMessage,
  setErrorMessage,
  removeMessage,
} from './reducers/notificationReducer'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = (props) => {
  const [allBlogs, setAllBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  /*   const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null) */
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setAllBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(props)
      props.setErrorMessage('Wrong credentials')
      setTimeout(() => {
        props.removeMessage()
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(BlogToAdd)
      props.setSuccessMessage(`Blog ${BlogToAdd.title} was successfully added`)
      setAllBlogs(allBlogs.concat(createdBlog))
      setTimeout(() => {
        props.removeMessage()
      }, 5000)
    } catch (exception) {
      props.setErrorMessage(`Cannot add blog ${BlogToAdd.title}`)
      setTimeout(() => {
        props.removeMessage()
      }, 5000)
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(BlogToUpdate)
      props.setSuccessMessage(
        `Blog ${BlogToUpdate.title} was successfully updated`
      )
      setAllBlogs(
        allBlogs.map((blog) =>
          blog.id !== BlogToUpdate.id ? blog : updatedBlog
        )
      )
      setTimeout(() => {
        props.removeMessage()
      }, 5000)
    } catch (exception) {
      props.setErrorMessage(`Cannot update blog ${BlogToUpdate.title}`)
      setTimeout(() => {
        props.removeMessage()
      }, 5000)
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        await blogService.remove(BlogToDelete.id)
        props.setSuccessMessage(
          `Blog ${BlogToDelete.title} was successfully deleted`
        )
        setAllBlogs(allBlogs.filter((blog) => blog.id !== BlogToDelete.id))
        setTimeout(() => {
          props.removeMessage()
        }, 5000)
      }
    } catch (exception) {
      props.setErrorMessage(`Cannot delete blog ${BlogToDelete.title}`)
      setTimeout(() => {
        props.removeMessage()
      }, 5000)
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout} type="submit">
              logout
            </button>
          </p>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {allBlogs.sort(byLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default connect(null, {
  setSuccessMessage,
  setErrorMessage,
  removeMessage,
})(App)
