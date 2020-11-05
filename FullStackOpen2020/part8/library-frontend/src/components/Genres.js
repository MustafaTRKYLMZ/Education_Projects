import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Genres = ({ setGenre }) => {
 
  const allBooks = useQuery(ALL_BOOKS)

  if (allBooks.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
          {allBooks.data.allBooks
          .map(b => b.genres)
          .reduce(function (a, b) {
          
           return a.concat(b);
                  }, [])
         .filter((value, index, self) => self.indexOf(value) === index)
         .map(genre =>
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
          )
          }
        <button onClick={() => setGenre(null)}>All genres</button>
    </div>
  )
}

export default Genres