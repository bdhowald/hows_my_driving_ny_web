import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'

import TwitterShare from './TwitterShare'

describe('TwitterShare', () => {
  let savedWindowOpen = global.open

  beforeEach(() => {
    savedWindowOpen = global.open
  })

  afterEach(() => {
    global.open = savedWindowOpen
  })

  describe('renders without error', () => {
    it('should render successfully', () => {
      render(<TwitterShare vehicle={VehicleFactory.build()} />)

      expect(screen.getByTestId('twitter-share-button')).toBeInTheDocument()
    })
  })

  it('should open a new window to share to Twitter when the Twitter share button is clicked.', () => {
    const mockedOpen = jest.fn()
    global.open = mockedOpen

    render(<TwitterShare vehicle={VehicleFactory.build()} />)

    const twitterShareButtonElement = screen.getByTestId('twitter-share-button')

    expect(twitterShareButtonElement).toBeInTheDocument()

    userEvent.click(twitterShareButtonElement)

    expect(mockedOpen).toHaveBeenCalled()
  })
})
