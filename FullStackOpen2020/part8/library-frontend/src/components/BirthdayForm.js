import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const BirthdayForm = ({ authors, setError }) => {
    const [name,setName] = useState(authors[0].name)
    const [born, setBorn] = useState('')

    const [changeBirthday] = useMutation(EDIT_AUTHOR, {
        onError: (error) => {
          console.log(error)
          setError(error.message)
        }
      })
    
      const submit = async (event) => {
        event.preventDefault()
    
        changeBirthday({ variables: { name, born } })
    
        setBorn('')
      }
    
      const handleChange = (e) => {
        setName(e.target.value)
      }

    return (
        <div>

        <form onSubmit={submit}>
            <div>
            Name
            <select onChange={handleChange} value={name}>
                {authors.map(a =>
                <option key={a.id} value={a.name}>{a.name}</option>
                )}
            </select>
            </div>
            <div>
            Year <input
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}
            />
            </div>
            <button type='submit'>Update Author</button>
        </form>
       </div>
   )
}

export default BirthdayForm 