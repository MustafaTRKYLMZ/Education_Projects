import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { prettyDOM } from '@testing-library/dom'
//import BlogMain from '.Blog'


const userTest = {
  id: '1234567890',
  username: 'sinasi',
  name: 'Mart',
  password: 'sinasi',
}

const blogTest = {
  id: '5a422a851b54a676234d17f7',
  title: 'Tomas adventure',
  author: 'Jahnsen',
  url: 'https://google.com/',
  likes: 4,
  user: userTest,
}


test('renders content', () => {//13
  const component = render(
    <Blog blog={blogTest} user={userTest} />
  )

  expect(component.container).toHaveTextContent(blogTest.title)
  expect(component.container).toHaveTextContent(blogTest.author)

})

test('when the clicked view button we are waiting details', () => {//14
  const component = render(
    <Blog blog={blogTest} user={userTest} />
  )
  const viewButton = component.getByRole('button', { name: 'view' })
  fireEvent.click(viewButton)


  expect(component.container).toHaveTextContent(blogTest.url)
  expect(component.container).toHaveTextContent(blogTest.likes)

})

test('clicked is twice view button', () => {//15

  const handleLike = jest.fn()

  const component = render(
    <Blog blog={blogTest} user={userTest} handleLike={handleLike} />
  )

  const viewButton = component.getByText('view' )
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like' )
 // const author = component.container.querySelector('#author')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)


  expect(handleLike.mock.calls).toHaveLength(2)

})

test('<BlogForm /> updates parent state and calls onSubmit', () => {//16
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('input[name="title"]')
  const inputAuthor = component.container.querySelector('input[name="author"]')
  const inputUrl = component.container.querySelector('input[name="url"]')

  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'testing of forms could be easier' }
  })

  fireEvent.change(inputAuthor, {
    target: { value: 'Tom Janson' }
  })


  fireEvent.change(inputUrl, {
    target: { value: 'input url' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
  expect(createBlog.mock.calls[0][0].author).toBe('Tom Janson')
  expect(createBlog.mock.calls[0][0].url).toBe('input url' )
})

