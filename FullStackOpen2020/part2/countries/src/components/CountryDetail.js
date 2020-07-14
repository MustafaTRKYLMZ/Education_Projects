import React from 'react'
import Language from './Language'

const CountryDetail = ({ person }) => {
    return (
    <div>
         
          <h2>{person.name}</h2>
         
          <br></br><br></br>

         capital   : {person.capital}<br></br>
         population: {person.population}<br></br><br></br>
         <h2>Languages</h2>
        <ul>
            { person.languages.map(len =>  <Language key={len.name} person={len.name}/>) }
        </ul>

         <br></br>
         <img src={person.flag} alt="Örnek Resim"  align="left" width="400px" height="200px"/> 

         
         
    </div>
    )
}
export default CountryDetail