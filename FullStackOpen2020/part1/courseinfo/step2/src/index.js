import React from 'react'
import ReactDOM from 'react-dom' 

const Part=(props)=>{
  return (
    <div>
      <p>
        {props.name}, exercises  {props.number} 
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name='Fundamentals of React' number='10'/>
      <Part name='Using props to pass data' number='7'/>
      <Part name='State of a component' number='14'/>
      
    </div>
  )
}

const App = () => {
  

 const course = 'Half Stack application development'
 const total=10+7+14
  return (
    <div>
      <h1>{course} </h1>
      
      <Content  />
      <p>Total {total} </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))