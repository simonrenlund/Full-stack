const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    case 'REMOVE':
      return initialState
    default:
      return state
  }
}

export const setNotification = (value) => {
  return {
    type: 'SET',
    data: value
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer
