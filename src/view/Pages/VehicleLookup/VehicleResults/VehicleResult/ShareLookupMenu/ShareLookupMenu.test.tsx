import React from 'react'
import * as htmlToImage from 'html-to-image'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { SettingsContext } from 'context/SettingsContext/SettingsContext'

import ShareLookupMenu from './ShareLookupMenu'

describe('ShareLookupMenu', () => {
  const mockedSettings = {
    getSetting: jest.fn().mockReturnValue(true),
    removeSetting: jest.fn(),
    updateSetting: jest.fn(),
  }

  const vehicle = VehicleFactory.build()

  describe('renders without error', () => {
    it('should render successfully', () => {
      const bodyRef = React.createRef<HTMLUListElement>()

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <ul ref={bodyRef}></ul>
          <ShareLookupMenu bodyRef={bodyRef} vehicle={vehicle} />
        </SettingsContext.Provider>,
      )

      expect(screen.getByTestId('copy-link-button')).toBeInTheDocument()
      expect(screen.getByTestId('copy-image-button')).toBeInTheDocument()
      expect(screen.getByTestId('twitter-share-button')).toBeInTheDocument()
      expect(screen.getByTestId('bluesky-share-button')).toBeInTheDocument()
    })
  })

  describe('button clicks', () => {
    it('should copy the link to the lookup when the user presses the copy link button of a lookup', async () => {
      const bodyRef = React.createRef<HTMLUListElement>()
      const writeText = jest.fn()

      Object.assign(navigator, {
        clipboard: {
          writeText,
        },
      })

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <ul ref={bodyRef}></ul>
          <ShareLookupMenu bodyRef={bodyRef} vehicle={vehicle} />
        </SettingsContext.Provider>,
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

    it('should copy an image of the lookup when the user presses the copy photo button of a lookup', async () => {
      const bodyRef = React.createRef<HTMLUListElement>()
      const write = jest.fn()

      const mockPngData = 'data:image/png;base64...'

      jest
        .spyOn(global, 'fetch')
        .mockImplementation(
          jest.fn(() =>
            Promise.resolve({ blob: () => Promise.resolve(mockPngData) }),
          ) as jest.Mock,
        )

      // jest.spyOn(window, 'ClipboardItem').mockReturnValueOnce({})

      const toPngSpy = jest.spyOn(htmlToImage, 'toPng')
      toPngSpy.mockResolvedValueOnce(mockPngData)

      Object.assign(navigator, {
        clipboard: {
          write,
        },
      })

      class MockClipboardItem {
        private data

        constructor(data: any) {
          this.data = data
          // You might need to add types or methods as required by your application
        }
        // Implement clipboard item methods if necessary for your tests, e.g., getType()
      }

      Object.assign(window, {
        ClipboardItem: MockClipboardItem,
      })

      render(
        <SettingsContext.Provider value={mockedSettings}>
          <ul ref={bodyRef}></ul>
          <ShareLookupMenu bodyRef={bodyRef} vehicle={vehicle} />
        </SettingsContext.Provider>,
      )

      const copyLookupImageButton = screen.getByLabelText(
        'copy image of lookup',
      )

      await act(async () => {
        // copy lookup link
        userEvent.click(copyLookupImageButton)
      })

      expect(navigator.clipboard.write).toHaveBeenCalledWith([
        new MockClipboardItem({
          'image/png': mockPngData,
          'text/plain': new Blob(['https://howsmydrivingny.nyc/e5f6g7h8'], {
            type: 'text/plain',
          }),
        }),
      ])

      // clean up after ourselves
      Object.assign(navigator, {
        clipboard: undefined,
      })

      Object.assign(window, {
        ClipboardItem: undefined,
      })
    })

    test.each([
      {
        service: 'bluesky',
      },
      {
        service: 'reddit',
      },
      {
        service: 'twitter',
      },
    ])(
      'should open a new window to share to Twitter when the Twitter share button is clicked.',
      ({ service }) => {
        const bodyRef = React.createRef<HTMLUListElement>()

        const mockedOpen = jest.fn()
        global.open = mockedOpen

        render(
          <SettingsContext.Provider value={mockedSettings}>
            <ul ref={bodyRef}></ul>
            <ShareLookupMenu bodyRef={bodyRef} vehicle={vehicle} />
          </SettingsContext.Provider>,
        )

        const socialShareButtonElement = screen.getByTestId(
          `${service}-share-button`,
        )

        expect(socialShareButtonElement).toBeInTheDocument()

        userEvent.click(socialShareButtonElement)

        expect(mockedOpen).toHaveBeenCalled()
      },
    )
  })
})
