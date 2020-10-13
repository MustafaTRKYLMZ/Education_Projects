import React, { useState } from 'react'
import Notification from './components/Notification'
import Info from './components/Info'

import Menu from './components/Menu'


const App = () => {
  //const infoMessage= useSelector(state => state.info)
  // const errorMessage= useSelector(state => state.error)
  const [infoMessage,setInfoMessage]=useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  return (
    <div className="container">
      <div>
        <h2 >Blog Application </h2>
        <Notification message={errorMessage} />
        <Info message={infoMessage} />
        <Menu setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage}/>
      </div>
    </div>

  )
}
export default App
