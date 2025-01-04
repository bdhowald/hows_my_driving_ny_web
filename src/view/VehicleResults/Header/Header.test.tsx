import React from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import Header from './Header'

describe('Header', () => {
  const refreshLookupFunction = jest.fn()
  const removeLookupFunction = jest.fn()

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
        <Header
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          vehicle={VehicleFactory.build()}
        />,
      )

      expect(screen.getByTestId('copy-button')).toBeInTheDocument()
      // expect(screen.getByTestId('refresh-lookup-button')).toBeInTheDocument()
      expect(screen.getByTestId('remove-lookup-button')).toBeInTheDocument()
      expect(screen.getByTestId('twitter-share-button')).toBeInTheDocument()
    })
  })

  describe('button clicks', () => {
    it('should copy the link to the lookup when the user presses the copy button of a lookup', async () => {
      const writeText = jest.fn()

      Object.assign(navigator, {
        clipboard: {
          writeText,
        },
      })

      const vehicle = VehicleFactory.build()

      render(
        <Header
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          vehicle={vehicle}
        />,
      )

      const copyLookupLinkButton = screen.getByLabelText('copy link to lookup')

      await act(async () => {
        // copy lookup link
        userEvent.click(copyLookupLinkButton)
      })

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        `https://howsmydrivingny.nyc/${vehicle.uniqueIdentifier}`,
      )

      // clean up after ourselves
      Object.assign(navigator, {
        clipboard: undefined,
      })
    })

    it('should open a new window to share to Twitter when the Twitter share button is clicked.', () => {
      const mockedOpen = jest.fn()
      global.open = mockedOpen

      render(
        <Header
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          vehicle={VehicleFactory.build()}
        />,
      )

      const twitterShareButtonElement = screen.getByTestId(
        'twitter-share-button',
      )

      expect(twitterShareButtonElement).toBeInTheDocument()

      userEvent.click(twitterShareButtonElement)

      expect(mockedOpen).toHaveBeenCalled()
    })

    it('clicking on the close button of a lookup should remove it from the page', async () => {
      const vehicle = VehicleFactory.build()

      render(
        <Header
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          vehicle={vehicle}
        />,
      )

      const removeLookupButton = screen.getByLabelText('remove lookup')
      userEvent.click(removeLookupButton)

      expect(removeLookupFunction).toHaveBeenCalled()
    })
  })
})
