import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    published
    author
    genres
    id
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    id
    name
    born
    bookCount
  }
}
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      id
      title
      published
      author
      genres
    }
  }

`
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      id
      name
      born
      bookCount
    }
  }
`