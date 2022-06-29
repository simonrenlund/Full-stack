import React from 'react'

const User = (props) => {
  //console.log(props.user)
  let user = {}
  if (!props.user) {
    user.username = ''
    user.blogs = []
  } else {
    user = props.user
  }
  const createdBlogs = props.createdBlogs
  return (
    <div>
      {user.name}: {user.blogs.length}
    </div>
  )
}

export default User
