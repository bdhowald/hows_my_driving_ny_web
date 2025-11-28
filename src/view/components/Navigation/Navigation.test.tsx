import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import Navigation from './Navigation'

describe('Navigation', () => {
  const mockedSettings = {
    getSetting: jest.fn(),
    removeSetting: jest.fn(),
    updateSetting: jest.fn(),
  }

  describe('rendering', () => {
    it('renders successfully', async () => {
      render(
        <MemoryRouter>
          <SettingsContext.Provider value={mockedSettings}>
            <Navigation />
          </SettingsContext.Provider>
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

    it('displays the active link with bold text', () => {
      render(
        <MemoryRouter initialEntries={['a1b2c3d4']}>
          <SettingsContext.Provider value={mockedSettings}>
            <Navigation />
          </SettingsContext.Provider>
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

      const searchNavLink = screen.getByText('Search')
      expect(searchNavLink).toHaveClass('active')
    })
  })

  describe('toggle menu', () => {
    it('should hide the nav bar when it is open and a user clicks outside of the nav bar', async () => {
      const someOtherElementTestId = 'some-other-element'

      render(
        <MemoryRouter>
          <SettingsContext.Provider value={mockedSettings}>
            <Navigation />
            <button data-testid={someOtherElementTestId}>I am a button</button>
          </SettingsContext.Provider>
        </MemoryRouter>,
      )

      const collapsibleNavBar = screen.getByTestId('navbar-collapse')
      const navBarToggleButton = screen.getByRole('button', {
        name: 'Toggle navigation',
      })
      const someOtherElement = screen.getByTestId(someOtherElementTestId)

      // toggle nav bar to be open
      userEvent.click(navBarToggleButton)

      // nav bar should have open class
      await waitFor(() => {
        expect(collapsibleNavBar).toHaveClass('show')
      })

      // click on the other element, not part of the nav bar
      userEvent.click(someOtherElement)

      // nav bar should no longer have open class
      await waitFor(() => {
        expect(collapsibleNavBar).not.toHaveClass('show')
      })
    })

    it('should hide the nav bar when it is open and a user clicks any part of the nav bar not a nav link', async () => {
      render(
        <MemoryRouter>
          <SettingsContext.Provider value={mockedSettings}>
            <Navigation />
          </SettingsContext.Provider>
        </MemoryRouter>,
      )

      const navigationBar = screen.getByRole('navigation')
      const collapsibleNavBar = screen.getByTestId('navbar-collapse')
      const navBarToggleButton = screen.getByRole('button', {
        name: 'Toggle navigation',
      })

      // toggle nav bar to be open
      userEvent.click(navBarToggleButton)

      // nav bar should have open class
      await waitFor(() => {
        expect(collapsibleNavBar).toHaveClass('show')
      })

      // click on the nav bar, but not the toggle
      userEvent.click(navigationBar)

      // nav bar should no longer have open class
      await waitFor(() => {
        expect(collapsibleNavBar).not.toHaveClass('show')
      })
    })

    it('should not hide the nav bar when a user clicks on a nav link when the nav bar is open', async () => {
      const someOtherElementTestId = 'some-other-element'

      render(
        <MemoryRouter>
          <SettingsContext.Provider value={mockedSettings}>
            <Navigation />
            <div data-testid={someOtherElementTestId}></div>
          </SettingsContext.Provider>
        </MemoryRouter>,
      )

      const collapsibleNavBar = screen.getByTestId('navbar-collapse')
      const navBarToggleButton = screen.getByRole('button', {
        name: 'Toggle navigation',
      })
      const updatesNavLink = screen.getByText('FAQs')

      // toggle nav bar to be open
      userEvent.click(navBarToggleButton)

      // nav bar should have open class
      await waitFor(() => {
        expect(collapsibleNavBar).toHaveClass('show')
      })

      // click on the nav link
      userEvent.click(updatesNavLink)

      // nav bar should still have open class
      await waitFor(() => {
        expect(collapsibleNavBar).toHaveClass('show')
      })
    })
  })
})
