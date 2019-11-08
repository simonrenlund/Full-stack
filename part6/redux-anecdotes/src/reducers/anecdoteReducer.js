
const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = state.find(a => a.id === action.data)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !==action.data ? a : changedAnecdote).sort((a,b) => (a.votes < b.votes) ? 1 : -1)
    case 'ADD':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
    }
}

export default reducer

export const addAnecdote = (data) => {
  return {
    type: 'ADD',
    data,
  }
}

export const voteAnecdote = (id) => {
  return {
    type:'VOTE',
    data: id
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}
