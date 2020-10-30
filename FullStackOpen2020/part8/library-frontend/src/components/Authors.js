import React from 'react'
import BirthdayForm from './BirthdayForm'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = ({setError,show,}) => {
    const result = useQuery(ALL_AUTHORS)
    if (!show) {
        return null
      }

    if (result.loading) {
        return <div>loading...</div>
      }
    
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set Birhday</h2>
      {result.data.allAuthors.length > 0
        ? <BirthdayForm setError={setError} authors={result.data.allAuthors} />
        : null}
    </div>
  )
}

export default Authors