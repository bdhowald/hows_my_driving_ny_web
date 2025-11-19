import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'

import Navigation from './Navigation'
import userEvent from '@testing-library/user-event'

describe('Navigation', () => {
  it('renders successfully', async () => {
    // Change the viewport to be a small screen
    global.innerWidth = 576

    // Trigger the window resize event.
    global.dispatchEvent(new Event('resize'))

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    )

    const navBarToggleButton = screen.getByRole('button', {
      name: 'Toggle navigation',
    })
    const collapsibleNavBar = screen.getByTestId('navbar-collapse')

    // Can't test CSS so find nav bar without open class
    expect(collapsibleNavBar).not.toHaveClass('show')

    // Toggle nav bar to be open
    userEvent.click(navBarToggleButton)

    // nav bar should have open class
    await waitFor(() => {
      expect(collapsibleNavBar).toHaveClass('show')
    })

    // Toggle nav bar to be closed again
    userEvent.click(navBarToggleButton)

    // nav bar should no longer have open class
    await waitFor(() => {
      expect(collapsibleNavBar).not.toHaveClass('show')
    })
  })
})
