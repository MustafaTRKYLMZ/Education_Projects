import React, { useEffect, useState } from 'react'
import { useApolloClient, useLazyQuery, useSubscription, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import {ALL_BOOKS } from './queries'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED, CURRENT_USER } from './queries'


const App = () => {
  const [token,setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [getCurrentUser, currentUserResult] = useLazyQuery(CURRENT_USER, { fetchPolicy: "network-only" })
  const result1 = useQuery(ALL_BOOKS)
  const client = useApolloClient()


  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!dataInStore.allBooks.map(b => b.id).includes(addedBook.id)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })
  
  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
      getCurrentUser()
    }
  }, []) // eslint-disable-line 

  useEffect(() => {
    if (currentUserResult.data) {
      setUser(currentUserResult.data.me)
    }
  }, [currentUserResult.data]) // eslint-disable-line 


  const setNewToken = (newToken) => {
    setToken(newToken)
    localStorage.setItem('library-user-token', newToken)
    setPage('authors')
    getCurrentUser()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if ((result1.loading))  {
    return <div>loading...</div>
  }
 
     const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
 
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const handleBookAdded = () => {
    setPage('authors')
  }

  return (
    <div>
      <div>{errorMessage}</div>
      
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
       
        {!token ? (
           <>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>Recommend</button>
            <button onClick={logout}>logout</button>
            
          </>
        )}
        
      </div>

      <Authors  setError={notify}
        show={page === 'authors'}
      />
    <Books
        show={page === 'books'} books={result1.data.allBooks} genreShow={user ? user.favoriteGenre : null}
      />
      <Books
        show={page === 'recommend'} books={result1.data.allBooks}
        genreShow={user ? user.favoriteGenre : null}
      />
 
      <NewBook setError={notify}
        show={page === 'add'}
      />
      <LoginForm setError={notify}  setToken={setNewToken} handleBookAdded={handleBookAdded}
        show={page === 'login'}
      />
    </div>
  )
}

export default App