import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter,setFilter]= useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      }) 
  }, [])
 
  
  return (
    <div>
    {console.log(filter.length)}
      <Filter filter={filter} setFilter={setFilter} />
      
      {(filter.length===0) ?"":<Countries countries={countries} filter={filter}/> }

    </div>
  )
}

export default App



