import React from 'react'

const Header = props =>
  <h1>{props.course}</h1>

const Total = ({parts}) => {
  const total = parts.reduce( (s, p) => {
      if (s.id) {
        return s.exercises + p.exercises
      } else {
        return s + p.exercises
      }

  })

  return <p><b>total of {total} exercises</b></p>
}


const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = ({parts}) => {
  const Parts = () => parts.map(part =>
    <Part
      key={part.id}
      part={part}
    />
  )
  return(
    <div>
      {Parts()}
      <Total parts={parts} />
    </div>
  )

}


const Course = props => (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
)

export default Course
