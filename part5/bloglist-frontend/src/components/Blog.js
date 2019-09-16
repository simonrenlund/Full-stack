import React,{useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ b }) => {
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

  return (
  <div onClick={toggleVisibility} style={blogStyle}>
    {blog.title} {blog.author}
    <br style={showWhenVis}></br>
    <a style={showWhenVis} href={blog.url}>{blog.url}</a>
    <div style={showWhenVis}>likes: {blog.likes} <button type="submit" onClick={handleLike}>like</button></div>
    <div style={showWhenVis}>added by {blog.user.name}</div>
  </div>
)}

export default Blog
