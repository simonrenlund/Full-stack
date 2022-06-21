const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'ADD':
      return state.concat(action.data)
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

export default blogReducer
