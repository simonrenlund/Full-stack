const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETF':
      return action.data
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const setFilter = (value) => {
  return ({
    type: 'SETF',
    data: value
  })
}

export const resetFilter = () => {
  return ({
    type: 'RESET'
  })
}

export default filterReducer
