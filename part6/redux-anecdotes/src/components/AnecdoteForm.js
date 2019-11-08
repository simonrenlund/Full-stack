import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    props.addAnecdote(event.target.anecdote.value)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  addAnecdote,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)
