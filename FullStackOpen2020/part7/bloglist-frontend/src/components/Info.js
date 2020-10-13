import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Info = ( { message }) => {
 // const message= useSelector(state => state.notification)
  if (message === null) {
    return null
  }

  return (
    <div className="container">
     {(message &&
    <Alert variant="success">
      {message}
    </Alert>
  )}
    </div>
  )
}

export default Info


