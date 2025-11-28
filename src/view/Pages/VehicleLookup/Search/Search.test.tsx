import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import Search from './Search'

describe('Search', () => {
  describe('renders without error', () => {
    const setExistingQueriesInFlight = () => null
    const setLookupInFlight = () => null
    const setQueriedVehicles = () => null
    const setSearchError = () => null

    test.each([
      {
        lookupInFlight: true,
        uniqueIdentifier: undefined,
        useNewStyleDisplay: true,
      },
      {
        lookupInFlight: true,
        uniqueIdentifier: 'a1b2c3d4',
        useNewStyleDisplay: true,
      },
      {
        lookupInFlight: false,
        uniqueIdentifier: undefined,
        useNewStyleDisplay: true,
      },
      {
        lookupInFlight: false,
        uniqueIdentifier: 'a1b2c3d4',
        useNewStyleDisplay: true,
      },
      {
        lookupInFlight: true,
        uniqueIdentifier: undefined,
        useNewStyleDisplay: false,
      },
      {
        lookupInFlight: true,
        uniqueIdentifier: 'a1b2c3d4',
        useNewStyleDisplay: false,
      },
      {
        lookupInFlight: false,
        uniqueIdentifier: undefined,
        useNewStyleDisplay: false,
      },
      {
        lookupInFlight: false,
        uniqueIdentifier: 'a1b2c3d4',
        useNewStyleDisplay: false,
      },
    ])(
      'renders successfully when lookupInFlight is $lookupInFlight and $uniqueIdentifier is uniqueIdentifier and the display is new style ($useNewStyleDisplay)',
      ({ lookupInFlight, uniqueIdentifier, useNewStyleDisplay }) => {
        const mockedSettings = {
          getSetting: jest.fn().mockReturnValue(useNewStyleDisplay),
          removeSetting: jest.fn(),
          updateSetting: jest.fn(),
        }

        render(
          <SettingsContext.Provider value={mockedSettings}>
            <Search
              fingerprintId={undefined}
              lookupInFlight={lookupInFlight}
              previousLookupUniqueIdentifierFromQuery={uniqueIdentifier}
              queriedVehicles={[]}
              searchError={false}
              setExistingQueriesInFlightFunction={setExistingQueriesInFlight}
              setLookupInFlightFunction={setLookupInFlight}
              setQueriedVehiclesFunction={setQueriedVehicles}
              setSearchErrorFunction={setSearchError}
            />
            ,
          </SettingsContext.Provider>,
        )

        const now = new Date()
        const day = now.getDate()
        const month = now.getMonth() + 1

        const isAprilFoolsDay = month === 4 && day === 1

        if (isAprilFoolsDay) {
          expect(screen.getByText(/How's My/i)).toBeInTheDocument()
          expect(screen.getByText(/Walking NY/i)).toBeInTheDocument()
          expect(
            screen.getByRole('link', { name: 'pedestrian kvetching data' }),
          ).toHaveAttribute(
            'href',
            'https://data.cityofnewyork.us/browse?q=parking%20violations&sortBy=relevance',
          )
        } else {
          expect(screen.getByText("How's My Driving NY")).toBeInTheDocument()
          expect(
            screen.getByRole('link', { name: 'parking & camera violations' }),
          ).toHaveAttribute(
            'href',
            'https://data.cityofnewyork.us/browse?q=parking%20violations&sortBy=relevance',
          )
        }
      },
    )

    it('should ensure only uppercase letters for entered plate input', () => {
      const mockedSettings = {
        getSetting: jest.fn(),
        removeSetting: jest.fn(),
        updateSetting: jest.fn(),
      }

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <Search
            fingerprintId={undefined}
            lookupInFlight={false}
            previousLookupUniqueIdentifierFromQuery={undefined}
            queriedVehicles={[]}
            searchError={false}
            setExistingQueriesInFlightFunction={setExistingQueriesInFlight}
            setLookupInFlightFunction={setLookupInFlight}
            setQueriedVehiclesFunction={setQueriedVehicles}
            setSearchErrorFunction={setSearchError}
          />
        </SettingsContext.Provider>,
      )

      const lowercaseText = 'abc1234'

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      userEvent.type(plateSearchInputHtmlElement, lowercaseText)

      expect(plateSearchInputHtmlElement).toHaveValue(
        lowercaseText.toUpperCase(),
      )
    })
  })
})
