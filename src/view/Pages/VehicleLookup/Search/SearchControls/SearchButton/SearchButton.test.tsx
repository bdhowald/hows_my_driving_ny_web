import * as React from 'react'
import { render, screen } from '@testing-library/react'

import SearchButton from './SearchButton'

describe('SearchButton', () => {
  describe('it renders without error', () => {
    test.each([
      {
        lookupInFlight: true,
        plateIdPresent: true,
      },
      {
        lookupInFlight: true,
        plateIdPresent: false,
      },
      {
        lookupInFlight: false,
        plateIdPresent: true,
      },
      {
        lookupInFlight: false,
        plateIdPresent: false,
      },
    ])(
      'renders successfully when lookupInFlight is $lookupInFlight and plateIdPresent is $plateIdPresent',
      ({ lookupInFlight, plateIdPresent }) => {
        render(
          <SearchButton
            lookupInFlight={lookupInFlight}
            plateIdPresent={plateIdPresent}
          />,
        )

        const searchButtonHtmlElement = screen.getByRole('button')
        expect(searchButtonHtmlElement).toBeInTheDocument()

        if (!lookupInFlight && plateIdPresent) {
          expect(searchButtonHtmlElement).not.toHaveAttribute('disabled')
        } else {
          expect(searchButtonHtmlElement).toHaveAttribute('disabled')
        }
      },
    )
  })
})
