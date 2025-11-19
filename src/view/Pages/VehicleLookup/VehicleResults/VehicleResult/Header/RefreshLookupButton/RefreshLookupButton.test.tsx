import React from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import RefreshLookupButton from './RefreshLookupButton'

describe('RefreshLookupButton', () => {
  const refreshLookupFunction = jest.fn()

  describe('renders without error', () => {
    it('should render successfully', () => {
      render(
        <RefreshLookupButton refreshLookupFunction={refreshLookupFunction} />,
      )

      expect(screen.getByTestId('refresh-lookup-button')).toBeInTheDocument()
    })
  })

  describe('button clicks', () => {
    it('should trigger a refresh of the lookup when a user presses the refresh lookup button of a lookup', async () => {
      render(
        <RefreshLookupButton refreshLookupFunction={refreshLookupFunction} />,
      )

      const refreshLookupLinkButton = screen.getByLabelText('refresh lookup')

      await act(async () => {
        // copy lookup link
        userEvent.click(refreshLookupLinkButton)
      })

      expect(refreshLookupFunction).toHaveBeenCalled()
    })
  })
})
