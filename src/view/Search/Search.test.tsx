import * as React from 'react'
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
      },
      {
        lookupInFlight: true,
        uniqueIdentifier: 'a1b2c3d4',
      },
      {
        lookupInFlight: false,
        uniqueIdentifier: undefined,
      },
      {
        lookupInFlight: false,
        uniqueIdentifier: 'a1b2c3d4',
      },
    ])(
      'renders successfully when lookupInFlight is $lookupInFlight and $uniqueIdentifier is uniqueIdentifier',
      ({ lookupInFlight, uniqueIdentifier }) => {
        render(
          <Search
            fingerprintId={undefined}
            lookupInFlight={lookupInFlight}
            mixpanelInstance={undefined}
            previousLookupUniqueIdentifierFromQuery={uniqueIdentifier}
            queriedVehicles={[]}
            searchError={false}
            setLookupInFlight={setLookupInFlight}
            setQueriedVehiclesFunction={setQueriedVehicles}
            setSearchErrorFunction={setSearchError}
          />,
        )

        expect(screen.getByText("How's My Driving NY")).toBeInTheDocument()
        expect(
          screen.getByRole('link', { name: 'parking & camera violations' }),
        ).toHaveAttribute(
          'href',
          'https://data.cityofnewyork.us/browse?q=parking%20violations&sortBy=relevance',
        )
      },
    )
  })
})
