import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { connect } from 'react-redux'
import {
    setNotification,
    removeNotification,
} from './reducers/notificationReducer'

const App = (props) => {
    const [blogs, setBlogs] = useState([])
    //blogform states
    const title = useField('text') //[title, setTitle] = useState('')
    const author = useField('text') //[author, setAuthor] = useState('')
    const url = useField('text') //[url, setUrl] = useState('')
    //user states
    const username = useField('text')
    const password = useField('text')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then((b) => {
            b.sort((a, b) => b.likes - a.likes)
            setBlogs(b)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value,
            })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            username.reset()
            username.reset()
        } catch (exception) {
            props.setNotification('Wrong credentials')
            username.reset()
            password.reset()
            setTimeout(() => {
                props.removeNotification()
            }, 3000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser('')
        window.location.reload()
    }

    const blogPost = async (event) => {
        event.preventDefault()
        try {
            const blog = {
                title: title,
                author: author,
                url: url,
            }
            const postedBlog = await blogService.create(blog)

            props.setNotification(
                `Blog ${title} by ${author} successfully added.`
            )
            setBlogs(blogs.concat(postedBlog))
            title.reset()
            author.reset()
            url.reset()
        } catch (exception) {
            props.setNotification(exception.message)
            setTimeout(() => {
                props.removeNotification()
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
            <p>
                Logged in as {user.name}.{' '}
                <button type="submit" onClick={handleLogout}>
                    Logout
                </button>
            </p>
            <Togglable buttonLabel="new blog">
                <BlogForm
                    title={title}
                    author={author}
                    url={url}
                    handleTitleChange={({ target }) =>
                        title.value(target.value)
                    }
                    handleAuthorChange={({ target }) =>
                        author.value(target.value)
                    }
                    handleUrlChange={({ target }) => url.value(target.value)}
                    blogPost={blogPost}
                />
            </Togglable>
            <h2>Blogs</h2>
            {blogs.map((b, i) => (
                <Blog b={b} key={i} u={user} />
            ))}
        </div>
    )

    return (
        <div>
            <Notification />
            <h1>Bloglist frontend</h1>
            {user === null ? loginForm() : blogForm()}
        </div>
    )
}

const mapDispatchToProps = {
    setNotification,
    removeNotification,
}

export default connect(null, mapDispatchToProps)(App)
