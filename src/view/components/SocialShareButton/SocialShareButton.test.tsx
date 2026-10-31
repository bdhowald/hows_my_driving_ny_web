import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import SocialShareButton from './SocialShareButton'

const DATA_IDS = {
  [SocialShareButton.Bluesky.name]: 'bluesky-share-button',
  [SocialShareButton.Reddit.name]: 'reddit-share-button',
  [SocialShareButton.Twitter.name]: 'twitter-share-button',
}

describe('SocialShareButton', () => {
  let savedWindowOpen = global.open

  beforeEach(() => {
    savedWindowOpen = global.open
  })

  afterEach(() => {
    global.open = savedWindowOpen
  })

  Object.entries(SocialShareButton).forEach(
    ([className, SocialShareButtonClass], _) => {
      describe(`${className}`, () => {
        const mockedSettings = {
          getSetting: vi.fn(),
          removeSetting: vi.fn(),
          updateSetting: vi.fn(),
        }

        describe('renders without error', () => {
          it('should render successfully', () => {
            render(
              <SettingsContext.Provider value={mockedSettings}>
                <SocialShareButtonClass vehicle={VehicleFactory.build()} />
              </SettingsContext.Provider>,
            )

            expect(
              screen.getByTestId(DATA_IDS[SocialShareButtonClass.name]),
            ).toBeInTheDocument()
          })
        })

        it(`should open a new window to share to when the ${className} share button is clicked.`, () => {
          const mockedOpen = vi.fn()
          global.open = mockedOpen

          render(
            <SettingsContext.Provider value={mockedSettings}>
              <SocialShareButtonClass vehicle={VehicleFactory.build()} />
            </SettingsContext.Provider>,
          )

          const socialShareButtonElement = screen.getByTestId(
            DATA_IDS[SocialShareButtonClass.name],
          )

          expect(socialShareButtonElement).toBeInTheDocument()

          userEvent.click(socialShareButtonElement)

          expect(mockedOpen).toHaveBeenCalled()
        })
      })
    },
  )
})
