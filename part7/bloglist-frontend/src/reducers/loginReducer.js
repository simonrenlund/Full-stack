const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const userLogin = (user) => {
  return {
    type: 'LOGIN',
    data: user,
  }
}

export const userLogout = () => {
  return {
    type: 'LOGOUT',
  }
}

export default loginReducer
