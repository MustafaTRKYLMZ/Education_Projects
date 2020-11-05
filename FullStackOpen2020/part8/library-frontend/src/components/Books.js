
import React, { useEffect, useState } from 'react'
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Genres from './Genres'

const Books = ({ show, genreShow }) => {
    const [genre, setGenre] = useState(null)
    const [getAllBooks, result] = useLazyQuery(ALL_BOOKS)

    const client = useApolloClient()
 
    
      useEffect(() => {
        if (genre) {
          getAllBooks({ variables: { genre: genre } })
        } else {
          getAllBooks()
        }
      }, [genre]) // eslint-disable-line 
    
      const setNewGenre = (newGenre) => {
        client.cache.evict({ fieldName: 'allBooks', args: { genre: genre } })
        setGenre(newGenre)
      }
     console.log("GENRE //////", genre)
     console.log("GENRE SHOW //////", genre)
    
 if (!show) {
    return null
  }

  if (result.loading ) {
    return <div>Loading...</div>
  }
  return (
    <div>
    
      {genreShow
        ?(genre?<h2>Recommendations</h2>
        :  <h2>Books</h2>):''
      }
      {genreShow
        ? (genre ? <h3>In genre '{genre}'</h3> : <h3>All genres</h3>)
        :  <h4>Books in your favorite genre '{genreShow}'</h4>
      }
      <div>
        <table>
          <tbody>
            <tr>
              <th>
                Title
              </th>
              <th>
                Author
              </th>
              <th>
                Published Year
              </th>
              <th>
                Genres
              </th>
            </tr>
            {
            result.data.allBooks.map(b =>
             
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
                <td>{b.genres.join(', ')}</td>
              </tr>
             ) }
            
          </tbody>
        </table>
      </div>
      {genreShow ? <Genres setGenre={setNewGenre} />: null}
    </div>
  )
}

export default Books