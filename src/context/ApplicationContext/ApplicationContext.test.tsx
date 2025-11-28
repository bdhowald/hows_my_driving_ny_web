import React, { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as AnalyticsTracker from 'utils/analytics/tracking'

import ApplicationProvider, { ApplicationContext } from './ApplicationContext'

const DummyComponent = () => {
  const applicationContext = useContext(ApplicationContext)
  const { tracker } = applicationContext

  return <button onClick={() => tracker?.trackEvent('test-event')} />
}

describe('ApplicationContext', () => {
  it('should expose a tracker instance', () => {
    const mockedTracker = new AnalyticsTracker.default([])
    const mockTrackFunction = jest.spyOn(mockedTracker, 'trackEvent')

    jest.spyOn(AnalyticsTracker, 'default').mockReturnValue(mockedTracker)

    render(
      <ApplicationProvider>
        <DummyComponent />
      </ApplicationProvider>,
    )

    const dummyButton = screen.getByRole('button')
    userEvent.click(dummyButton)

    expect(mockTrackFunction).toHaveBeenCalledTimes(1)
  })
})
