import React from 'react'
import personService from '../services/personService'

const Person = ({ person,persons,setPersons,setMessage}) => {

    
    const delPerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm (`Delete ${person.name}?`)) {
            personService
                .deleteIt(person.id).then(response => {
                    setMessage({text:`Deleted '${person.name}'`, class:'info'})
                })
                .catch(error => {
                    setMessage({text:`Information of '${person.name}' has already been removed from server`,
                                class:'error'})
                })   
            setPersons(persons.filter(p => p.id !== id))
            setTimeout(() => {
              setMessage(null)
            }, 3000)            
        }
    }

    return <>{person.name}{": "}{person.number}<button onClick={() => delPerson(person.id)}>Delete</button><br></br></>
      
    }

export default Person