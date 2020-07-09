import React, { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
  
    const addPhone = (event) => {
       event.preventDefault()
       if (persons.some(e => e.name === newName)) {
               window.alert(`${newName} is already added to phonebook`)
    
         }else{
             const phoneObject = {
             name: newName,
             number: newNumber,
             id: persons.length + 1,
        }
        setPersons(persons.concat(phoneObject))
        setNewName('')
        setNewNumber('')
       }
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }  
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }  
  
    return (
        <form onSubmit={addPhone}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
  }
  export default PersonForm