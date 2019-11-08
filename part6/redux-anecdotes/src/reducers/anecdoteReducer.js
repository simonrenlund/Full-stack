
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)

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
      const anecdote = asObject(action.data)
      return state.concat(anecdote)
    case 'INIT':
      return action.data
    default:
      return state
    }
}

export default reducer

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: anecdote
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
