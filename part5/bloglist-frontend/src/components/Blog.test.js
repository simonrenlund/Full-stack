import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('Blog', () => {
  let component
  beforeEach(() => {
    const blog = {
      title: 'Testblog',
      author: 'Simon R',
      likes: 4,
      url: 'http://xD.com',
      user: {
        username: 'SimppL',
        name: 'Simon',
        id: '5d7b5f534e0eaa5f68dc28dd'
      }
    }
    const user = {
      username: 'SimppL',
      name: 'Simon'
    }

    component = render(
      <Blog b={blog} u={user} />
    )
  })

  test('only author and title shown by default',() => {


    expect(component.container).toHaveTextContent(
      'Testblog Simon R'
    )
  })

  test('clicking blog expands the entry',() => {


    const button = component.getByText('Testblog Simon R')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Testblog Simon R'
    )
  })
})
