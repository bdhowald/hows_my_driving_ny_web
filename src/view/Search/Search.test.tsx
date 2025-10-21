import * as React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { render, screen } from '@testing-library/react'

import Search from './Search'

describe('Search', () => {
  describe('renders without error', () => {
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
        render(
          <CookiesProvider
            cookies={new Cookies(`useNewStyleDisplay=${useNewStyleDisplay};`)}
          >
            <Search
              fingerprintId={undefined}
              lookupInFlight={lookupInFlight}
              previousLookupUniqueIdentifierFromQuery={uniqueIdentifier}
              queriedVehicles={[]}
              searchError={false}
              setLookupInFlight={setLookupInFlight}
              setQueriedVehiclesFunction={setQueriedVehicles}
              setSearchErrorFunction={setSearchError}
            />
            ,
          </CookiesProvider>,
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
  })
})
