import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Testblog',
    author: 'Simon R',
    likes: 4
  }
  const component = render(<SimpleBlog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'Testblog Simon Rblog has 4 likes'
  )
})

test('like button can be pressed multiple times', () => {
  const blog = {
    title: 'Testblog',
    author: 'Simon R',
    likes: 4
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})
