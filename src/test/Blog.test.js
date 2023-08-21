import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'


test('renders blog title, but not the author, url, likes and user by default', () => {
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
