import React from 'react'
//import { useSelector } from 'react-redux'

const Notification = ( { message }) => {
  //const message= useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  return (
    <div className="container">
      {message}
    </div>
  )
}

export default Notification