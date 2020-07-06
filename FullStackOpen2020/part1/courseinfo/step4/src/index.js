import React from 'react'
import ReactDOM from 'react-dom' 


const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}
const Parts = (props) => {
  console.log(props)
return (
  <div>
<p>{props.parts[0].name}{props.parts[0].exercises}</p>
<p>{props.parts[1].name}{props.parts[1].exercises}</p>
<p>{props.parts[2].name}{props.parts[2].exercises}</p>
</div>
)


}
const Content = (props) =>{

return (
<Parts parts={props.parts}/>

)

}




const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const Total=()=>{
    return (
      <p>Total: {parts[0].exercises+parts[1].exercises+parts[2].exercises}</p>
    )
    
    }
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))