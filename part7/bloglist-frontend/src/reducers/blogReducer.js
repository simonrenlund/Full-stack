const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'ADD':
      return state.concat(action.data)
    case 'LIKE':
      const blogToChange = state.find((b) => b.id === action.data)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state
        .map((a) => (a.id !== action.data ? a : changedBlog))
        .sort((a, b) => (a.votes < b.votes ? 1 : -1))
    case 'DELETE':
      const blogToDelete = state.find((b) => b.id === action.data)
      return state.filter((b) => b.id !== blogToDelete.id)
    default:
      return state
  }
}

export const initBlogs = (blogs) => {
  return {
    type: 'INIT',
    data: blogs,
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD',
    data: blog,
  }
}

export const likeBlog = (id) => {
  return {
    type: 'LIKE',
    data: id,
  }
}

export const delBlog = (id) => {
  return {
    type: 'DELETE',
    data: id,
  }
}

export default blogReducer
