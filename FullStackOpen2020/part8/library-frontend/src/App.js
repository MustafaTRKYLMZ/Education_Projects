import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
//import { useQuery } from '@apollo/client'
import { gql, useQuery } from '@apollo/client';
import {ALL_BOOKS,ALL_AUTHORS} from './queries'


const App = () => {

  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const result1 = useQuery(ALL_BOOKS)
 

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if ((result1.loading))  {
    return <div>loading...</div>
  }


  return (
    <div>
      <div>{errorMessage}</div>
      
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors  setError={notify}
        show={page === 'authors'}
      />

      <Books books={result1.data.allBooks}
        show={page === 'books'}
      />
 
      <NewBook setError={notify}
        show={page === 'add'}
      />

    </div>
  )
}

export default App