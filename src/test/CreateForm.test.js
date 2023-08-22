import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import CreateForm from '../components/CreateForm'

// !!! this test does not work. Having issues accessing the mock event handler content after the form is submitted
test('when new blog is created, the form calls the event handler "addBlog" with the right details', async () => {
  const mockAddBlog = jest.fn()
  const user = userEvent.setup()

  const newBlog = {
    title: 'Michael Scott Wikipedia',
    author: 'Dwight Schrute',
    url: 'https://en.wikipedia.org/wiki/Michael_Scott_(The_Office)'
  }

  render(<CreateForm addBlog={mockAddBlog} title={newBlog.title} author={newBlog.author} url={newBlog.url} />)

  //const createButton = screen.queryByText('create')
  const createButton = screen.getByRole('button', { name: 'create'})
  screen.debug(createButton)

  const clickButtton = user.click(createButton)

  console.log(mockAddBlog.mock.calls)

})
