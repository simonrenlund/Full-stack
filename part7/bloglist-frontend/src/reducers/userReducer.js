const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITUSERS':
      return action.data
    default:
      return state
  }
}

export const initUsers = (users) => {
  return {
    type: 'INITUSERS',
    data: users,
  }
}

export default userReducer
