import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test("blogs are not rendered if the user isn't logged in", async() => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    expect(component.container).not.toHaveTextContent('Blogs')
  })

  //TODO: Se till att testet funkar ordentligt
  test('app allows users to log in', async() => {
    const component = render(
      <App />
    )
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    component.rerender(<App />)
    expect(component.container).toHaveTextContent('logout')
  })
})
