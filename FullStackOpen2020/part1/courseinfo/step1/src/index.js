import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const Total = 'Total'
  const Header = 'Header'
  const Content='Content'
  const total=exercises1+exercises2+exercises3

  return (
    <div>
      
       <p>Header {course} </p>
       <p>Content {part1}, {part2}, {part3} </p>
       <p>Total {total} </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))