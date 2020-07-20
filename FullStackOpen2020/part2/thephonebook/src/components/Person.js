import React from 'react'
import personService from '../services/personService'
import '../index.css'

const Person = ({ person,persons,setPersons,setMessage}) => {

    
    const delPerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm (`Delete ${person.name}?`)) {
            personService
                .deleteIt(person.id).then(response => {
                    setMessage({text:`Deleted '${person.name}'`})
                })  
                .catch(error => {
                    setMessage({text:`Information of '${person.name}' has already been removed from server`,
                   className:'error'})
                })   
            setPersons(persons.filter(p => p.id !== id))
            setTimeout(() => {
              setMessage(null)
            }, 5000)            
        }
    }

    return  ( 
        <li className='person'>
            {person.name} {person.number} <button onClick={() => delPerson(person.id)}>Delete</button>
        </li>
    )
    }

export default Person