import React from 'react'
import Country from './Country'
import CountryDetail from'./CountryDetail'


    

const Countries = ({ countries, setFilter,filter }) => {

  const leng=countries.filter(e => e.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
    <Country key={person.name} person={person}/> )

console.log("country length "+countries.length)
console.log("filter length "+ leng.length)
    return (
      <div>
        <ul>
        {(leng.length<=10&&leng.length>1)?countries.filter(e => e.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
          <Country key={person.name} person={person} setFilter={setFilter}/>
        ):""}

        {(leng.length===1)?countries.filter(e => e.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
          <CountryDetail key={person.name} person={person} />):''}
          {(leng.length>10)?"Too many matches, specify another filter":''}
      </ul>
      </div>
      
    )
  }

  export default Countries