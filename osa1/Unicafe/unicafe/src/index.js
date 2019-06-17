import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({value, text}) => {
  if (text === "Positive") {
    return(
      <tr><td>{text}</td><td>{value}%</td></tr>
    )
  } else {
    return(
      <tr><td>{text}</td><td>{value}</td></tr>
    )
  }
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return(
      <p>Statistics will be shown once feedback has been given.</p>
    )
  } else {
    const average = (good - bad) / total
    const positive = good * 100 / total
    return(
      <table>
        <tbody>
          <Statistic value={good} text="Good" />
          <Statistic value={neutral} text="Neutral" />
          <Statistic value={bad} text="Bad" />
          <Statistic value={total} text="All" />
          <Statistic value={average} text="Average" />
          <Statistic value={positive} text="Positive" />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
