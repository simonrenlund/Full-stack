import React,{useState} from 'react'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

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

  return (
  <div onClick={toggleVisibility} style={blogStyle}>
    {blog.title} {blog.author}
    <br style={showWhenVis}></br>
    <a style={showWhenVis} href={blog.url}>{blog.url}</a>
    <div style={showWhenVis}>likes: {blog.likes} <button type="submit">like</button></div>
    <div style={showWhenVis}>added by {blog.user.name}</div>
  </div>
)}

export default Blog
