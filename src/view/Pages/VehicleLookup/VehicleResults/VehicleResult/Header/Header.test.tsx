import React from 'react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import Header from './Header'

describe('Header', () => {
  const refreshLookupFunction = jest.fn()
  const removeLookupFunction = jest.fn()

  const mockedSettings = {
    getSetting: jest.fn().mockReturnValue(true),
    removeSetting: jest.fn(),
    updateSetting: jest.fn(),
  }

  let savedWindowOpen = global.open

  beforeEach(() => {
    savedWindowOpen = global.open
  })

  afterEach(() => {
    global.open = savedWindowOpen
  })

  describe('renders without error', () => {
    it('should render successfully', () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <Header
            fromPreviousLookupUniqueIdentifier={false}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
          />
        </SettingsContext.Provider>,
      )

      // expect(screen.getByTestId('refresh-lookup-button')).toBeInTheDocument()
      expect(screen.getByTestId('remove-lookup-button')).toBeInTheDocument()
    })
  })

  describe('displaying previous lookups', () => {
    it('should display a subheader if this is the header for a previous lookup', () => {
      render(
        <MemoryRouter>
          <SettingsContext.Provider value={mockedSettings}>
            <Header
              fromPreviousLookupUniqueIdentifier={true}
              refreshLookupFunction={refreshLookupFunction}
              removeLookupFunction={removeLookupFunction}
            />
          </SettingsContext.Provider>
        </MemoryRouter>,
      )

      const sharedViaLinkMessage = screen.getByText('Shared via link')
      expect(sharedViaLinkMessage).toBeInTheDocument()
    })

    it('should change the route when the user removes the previous lookup', () => {
      const LocationDisplay = () => {
        const location = useLocation()
        return <div data-testid="location-display">{location.pathname}</div>
      }

      const vehicle = VehicleFactory.build()
      const initialRoute = `/${vehicle.uniqueIdentifier}`

      render(
        <MemoryRouter initialEntries={[initialRoute]}>
          <SettingsContext.Provider value={mockedSettings}>
            <Header
              fromPreviousLookupUniqueIdentifier={true}
              refreshLookupFunction={refreshLookupFunction}
              removeLookupFunction={removeLookupFunction}
            />
            <LocationDisplay />
          </SettingsContext.Provider>
        </MemoryRouter>,
      )

      expect(screen.getByTestId('location-display').textContent).toBe(
        initialRoute,
      )

      const removePreviousLookupButton = screen.getByRole('button', {
        name: 'remove lookup',
      })
      expect(removePreviousLookupButton).toBeInTheDocument()

      userEvent.click(removePreviousLookupButton)

      expect(screen.getByTestId('location-display').textContent).toBe('/')
    })
  })

  describe('button clicks', () => {
    it('clicking on the close button of a lookup should remove it from the page', async () => {
      render(
        <SettingsContext.Provider value={mockedSettings}>
          <Header
            fromPreviousLookupUniqueIdentifier={false}
            refreshLookupFunction={refreshLookupFunction}
            removeLookupFunction={removeLookupFunction}
          />
        </SettingsContext.Provider>,
      )

      const removeLookupButton = screen.getByLabelText('remove lookup')
      userEvent.click(removeLookupButton)

      expect(removeLookupFunction).toHaveBeenCalled()
    })
  })
})
