import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes

  const vote = async(id) => {
    console.log('vote', id)
    props.store.dispatch(voteAnecdote(id))
    let anecdotes = props.store.getState().anecdotes
    for (let i = 0;i<anecdotes.length;i++) {
      if (anecdotes[i].id===id) {
        anecdotes = anecdotes[i]
        break
      }
    }
    const str = 'You voted for ' + anecdotes.content
    props.store.dispatch(setNotification(str))
    setTimeout(() => {
      props.store.dispatch(removeNotification())
    }, 5000)

  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
