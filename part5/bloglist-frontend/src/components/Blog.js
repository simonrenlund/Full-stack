import React,{useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ b, u }) => {
  const [visible, setVisible] = useState(false)
  const [blog, setBlog] = useState(b)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVis = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async(event) => {
    event.preventDefault()
    const likes = blog.likes + 1
    const likedBlog = {
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const updateBlog = await blogService.update(blog.id, likedBlog)
    setBlog(updateBlog)
  }

  const handleDel = async(event) => {
    try {
      event.preventDefault()
      if (window.confirm("Are you sure you want to delete " + blog.title + "?")) {
        const id = blog.id
        console.log(id)
        await blogService.remove(id)
        window.location.reload()
      }
    } catch(exception) {
      console.log("del failed.")
    }
  }

  const userVisibility = { display: u.username === blog.user.username ? '' : 'none' }

  return (
  <div onClick={toggleVisibility} style={blogStyle}>
    {blog.title} {blog.author}
    <div style={showWhenVis}>
      <a href={blog.url}>{blog.url}</a>
      <div>likes: {blog.likes} <button type="submit" onClick={handleLike}>like</button></div>
      <div>added by {blog.user.name}</div>
      <button style={userVisibility} type="submit" id={blog.id} onClick={handleDel}>remove</button>
    </div>
  </div>
)}

export default Blog
