/* eslint-disable indent */
const initialState = ['', '']

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return [action.data, action.type]
    case 'ERROR':
      return [action.data, action.type]
    case 'REMOVE':
      return initialState
    default:
      return state
  }
}

export const setSuccessMessage = (value) => {
  return {
    type: 'SUCCESS',
    data: value,
  }
}

export const setErrorMessage = (value) => {
  return {
    type: 'ERROR',
    data: value,
  }
}

export const removeMessage = () => {
  return {
    type: 'REMOVE',
  }
}

export default notificationReducer
