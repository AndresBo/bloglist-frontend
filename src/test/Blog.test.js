import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


test('by default renders blog component with title, not the author, url or likes', () => {
  const blog = {
    title: 'title should render',
    author: 'author should not render',
    url: 'url should not render',
    likes: 1,
  }

  render( <Blog blog={blog} />)
  // screen method accesses rendered component
  const title = screen.getByText('title should render')
  const author = screen.queryByText('author should not render')
  const url = screen.queryByText('url should not render')
  const likes = screen.queryByText('1')

  expect(title).toBeDefined()
  expect(author).toBeNull()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('when "show" button in blog component is clicked, title, author, url and likes are displayed', async () => {
  const blog = {
    title: 'title should render',
    author: 'author should render',
    url: 'url should render',
    likes: 1,
    user: {
      username: 'mario',
      name: 'mario mario',
    }
  }

  render( <Blog blog={blog} />  )

  const user = userEvent.setup()
  const showButton = screen.getByText('show')
  await user.click(showButton)

  const title = screen.getByText('title should render')
  const author = screen.getByText('author should render')
  const likes = screen.getByText('likes 1')
  const name = screen.getByText('mario mario')
  const url = screen.getByRole('link')

  expect(title).toBeDefined()
  expect(url).toHaveAttribute('href', 'url should render')
  expect(author).toBeDefined()
  expect(likes).toBeDefined()
  expect(name).toBeDefined()
})
