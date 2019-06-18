import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) => <button onClick={handleClick}>{text}</button>

const Points = ({points}) => {
  return (
    <p>has {points} votes</p>
  )
}

const Top = ({anecdotes, votes}) => {
  let top = 0
  for (let i = 0; i < 6;i++) {
    if (votes[i] > votes[top]) {
      top = i
    }
  }
  return(
    <p>{anecdotes[top]} <br></br>has {votes[top]} votes.</p>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, addPoint] = useState([0,0,0,0,0,0])
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <Points points={votes[selected]} />
      <Button handleClick={() => {
        let number = Math.floor((Math.random()*6))
        return setSelected(number)
      }} text="next anecdote" />
      <Button handleClick={() => {
        const copy = [...votes]
        copy[selected] += 1
        addPoint(copy)
        //console.log(copy[selected])
      }}text="vote" />

      <h2>Anecdote with most votes</h2>
      <Top anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
