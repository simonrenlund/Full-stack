import React, { useState } from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const [time,setTime] = useState(null)
  const vote = (id) => {
    props.voteAnecdote(id)
    const anecdote = props.visibleAnecdotes.find(a => a.id === id)
    const str = 'You voted for ' + anecdote.content
    console.log(time)
    if (time) {
      clearTimeout(time)
      console.log('cleared!')
    }
    props.setNotification(str)
    setTime(setTimeout(()=>{
      props.removeNotification()
    },5000)) 
  }

  return(
    <div>
      {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({anecdotes, filter}) => {
  if (filter === '') {
    return anecdotes
  } else {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  }
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
  removeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
