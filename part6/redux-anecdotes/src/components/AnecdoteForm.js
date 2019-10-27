import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const anecdote =event.target.anecdote.value
    store.dispatch(addAnecdote(anecdote))
    event.target.anecdote.value = ''
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
