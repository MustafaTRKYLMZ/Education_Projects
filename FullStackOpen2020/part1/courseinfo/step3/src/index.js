import React from 'react'
import ReactDOM from 'react-dom' 


const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}
const Parts = (props) => {
  console.log(props)
return <p>{props.course1}{props.course2}</p>
}
const Total=()=>{
return <p>{part1.exercises+part2.exercises+part3.exercises}</p>
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Parts course1={part1.name} course2={part1.exercises}/>
      <Parts course1={part2.name} course2={part2.exercises}/>
      <Parts course1={part3.name} course2={part3.exercises}/>
     <Total course1={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))