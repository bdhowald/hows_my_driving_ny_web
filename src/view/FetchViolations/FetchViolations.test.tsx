import * as React from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'
import * as boundaryFunctions from 'boundaries/http'
import FetchViolations from './FetchViolations'
import plateTypes from 'constants/plateTypes'

describe('FetchViolations', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = function () {}
  })

  it('should render successfully', () => {
    render(<FetchViolations />)

    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth() + 1

    const isAprilFoolsDay = month === 4 && day === 1

    if (isAprilFoolsDay) {
      // header
      expect(screen.getByText(/Walking NY/)).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: 'pedestrian kvetching data' }),
      ).toHaveAttribute(
        'href',
        'https://data.cityofnewyork.us/browse?q=parking%20violations&sortBy=relevance',
      )
    } else {
      // header
      expect(screen.getByText("How's My Driving NY")).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: 'parking & camera violations' }),
      ).toHaveAttribute(
        'href',
        'https://data.cityofnewyork.us/browse?q=parking%20violations&sortBy=relevance',
      )
    }

    // footer
    expect(screen.getByText('@bdhowald')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '@bdhowald' })).toHaveAttribute(
      'href',
      'https://github.com/bdhowald',
    )
  })

  describe('perform lookups', () => {
    it('should perform a lookup when the appropriate inputs are typed in', async () => {
      const performNewLookupSpy = jest.spyOn(
        boundaryFunctions,
        'performNewLookup',
      )

      performNewLookupSpy.mockResolvedValueOnce({
        data: [
          {
            statusCode: 201,
            successfulLookup: true,
            vehicle: VehicleFactory.build(),
          },
        ],
      })

      render(
        <CookiesProvider cookies={new Cookies('lookupIdentifiers=;')}>
          <FetchViolations />
        </CookiesProvider>,
      )

      const plate = 'ABC1234'

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      userEvent.type(plateSearchInputHtmlElement, plate)

      const searchButtonHtmlElement = screen.getByRole('button')
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        expect(performNewLookupSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            lookupSource: 'web_client',
            plate: 'ABC1234:NY',
          }),
        )
      })
    })

    it('should perform multiple lookups', async () => {
      const queries = [
        { plate: 'ABC1234', state: 'NY', plateType: 'passenger' },
        { plate: 'XXX1122', state: 'IN', plateType: 'commercial' },
        { plate: 'VOTE4ME', state: 'CA' },
      ]
      const performNewLookupSpy = jest.spyOn(
        boundaryFunctions,
        'performNewLookup',
      )

      performNewLookupSpy
        .mockResolvedValueOnce({
          data: [
            {
              statusCode: 201,
              successfulLookup: true,
              vehicle: VehicleFactory.build(queries[0]),
            },
          ],
        })
        .mockResolvedValueOnce({
          data: [
            {
              statusCode: 201,
              successfulLookup: true,
              vehicle: VehicleFactory.build(queries[1]),
            },
          ],
        })
        .mockResolvedValueOnce({
          data: [
            {
              statusCode: 201,
              successfulLookup: true,
              vehicle: VehicleFactory.build(queries[2]),
            },
          ],
        })

      render(
        <CookiesProvider cookies={new Cookies('lookupIdentifiers=;')}>
          <FetchViolations />
        </CookiesProvider>,
      )

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      const regionSelectHtmlElement = screen.getByRole('combobox', {
        name: 'Select Region',
      })
      const plateTypeSelectHtmlElement = screen.getByRole('combobox', {
        name: 'Select License Plate Type',
      })
      const searchButtonHtmlElement = screen.getByRole('button')

      // set plate
      userEvent.type(plateSearchInputHtmlElement, queries[0].plate)
      // set state
      userEvent.selectOptions(regionSelectHtmlElement, queries[0].state)

      if (queries[0].plateType) {
        // set plateType
        userEvent.selectOptions(
          plateTypeSelectHtmlElement,
          queries[0].plateType,
        )
      }

      // fire the search
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        expect(performNewLookupSpy).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            lookupSource: 'web_client',
            plate:
              'ABC1234:NY:AGR,ARG,AYG,BOB,CMH,FPW,GSM,HAM,HIS,JWV,MCL,NLM,ORG,PAS,PHS,PPH,RGL,SOS,SPO,SRF,WUG',
          }),
        )
        screen.getByText(queries[0].plate)
      })

      // clear the input
      userEvent.clear(plateSearchInputHtmlElement)

      // set plate
      userEvent.type(plateSearchInputHtmlElement, queries[1].plate)
      // set state
      userEvent.selectOptions(regionSelectHtmlElement, queries[1].state)

      if (queries[1].plateType) {
        // set plateType
        userEvent.selectOptions(
          plateTypeSelectHtmlElement,
          queries[1].plateType,
        )
      }

      // fire the search
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        expect(performNewLookupSpy).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining({
            lookupSource: 'web_client',
            plate:
              'XXX1122:IN:AGC,APP,CHC,CMB,COM,CSP,FAR,HAC,IRP,LOC,ORC,RGC,SPC,STG,THC,TRC',
          }),
        )
        screen.getByText(queries[1].plate)
      })

      // clear the input
      userEvent.clear(plateSearchInputHtmlElement)

      // set plate
      userEvent.type(plateSearchInputHtmlElement, queries[2].plate)
      // set state
      userEvent.selectOptions(regionSelectHtmlElement, queries[2].state)
      // reset plate type
      userEvent.selectOptions(plateTypeSelectHtmlElement, 'none')
      // fire the search
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        expect(performNewLookupSpy).toHaveBeenNthCalledWith(
          3,
          expect.objectContaining({
            lookupSource: 'web_client',
            plate: 'VOTE4ME:CA',
          }),
        )
        screen.getByText(queries[2].plate)
      })
    })

    it('should scroll to the new lookup when the lookup completes', async () => {
      const scrollIntoViewFunction = jest.fn()

      Object.assign(window.HTMLElement.prototype, {
        scrollIntoView: scrollIntoViewFunction,
      })

      const performNewLookupSpy = jest.spyOn(
        boundaryFunctions,
        'performNewLookup',
      )

      performNewLookupSpy.mockResolvedValueOnce({
        data: [
          {
            statusCode: 201,
            successfulLookup: true,
            vehicle: VehicleFactory.build(),
          },
        ],
      })

      render(
        <CookiesProvider cookies={new Cookies('lookupIdentifiers=;')}>
          <FetchViolations />
        </CookiesProvider>,
      )

      const plate = 'ABC1234'

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      userEvent.type(plateSearchInputHtmlElement, plate)

      const searchButtonHtmlElement = screen.getByRole('button')
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        expect(performNewLookupSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            lookupSource: 'web_client',
            plate: 'ABC1234:NY',
          }),
        )

        expect(scrollIntoViewFunction).toHaveBeenCalledWith({
          behavior: 'smooth',
        })
      })
    })

    describe('new-style display', () => {
      it('should populate the lookup on the page when a plate is queried', async () => {
        const performNewLookupSpy = jest.spyOn(
          boundaryFunctions,
          'performNewLookup',
        )

        const violation = ViolationFactory.build({
          amountDue: 15,
          fineAmount: 65,
          formattedTime: '2024-08-23T15:57:14.000-04:00',
          interestAmount: 0.69,
          location: '191 Netherland Ave',
          humanizedDescription: 'Failure to Display Meter Receipt',
          paymentAmount: 75,
          penaltyAmount: 25,
          reductionAmount: 0.69,
          violationCounty: 'Staten Island',
        })

        const vehicle = VehicleFactory.build({
          fines: {
            totalFined: 500,
            totalInJudgment: 25,
            totalOutstanding: 50,
            totalPaid: 400,
            totalReduced: 25,
          },
          plateTypes: [
            'AGC',
            'APP',
            'CHC',
            'CMB',
            'COM',
            'CSP',
            'FAR',
            'HAC',
            'IRP',
            'LOC',
            'ORC',
            'RGC',
            'SPC',
            'STG',
            'THC',
            'TRC',
          ],
          previousLookupDate: '2024-11-12T15:57:14.000Z',
          previousViolationCount: 3,
          violations: [
            ViolationFactory.build(),
            ViolationFactory.build(),
            ViolationFactory.build(),
            violation,
          ],
        })

        performNewLookupSpy.mockResolvedValueOnce({
          data: [
            {
              statusCode: 201,
              successfulLookup: true,
              vehicle,
            },
          ],
        })

        // I'm not sure why this is necessary. Somehow cookies below in CookiesProvider are reset unexpectedly.
        document.cookie =
          'useNewStyleDisplay=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None;'

        render(
          <CookiesProvider
            cookies={new Cookies('lookupIdentifiers=;useNewStyleDisplay=true;')}
          >
            <FetchViolations />
          </CookiesProvider>,
        )

        const plate = 'ABC1234'

        const plateSearchInputHtmlElement = screen.getByRole('textbox')
        userEvent.type(plateSearchInputHtmlElement, plate)

        const searchButtonHtmlElement = screen.getByRole('button')
        userEvent.click(searchButtonHtmlElement)

        await waitFor(() => {
          // LookupInfo component
          screen.getByText('Plate:')
          screen.getByText(plate)

          screen.getByText('State:')
          screen.getByText('NY')

          screen.getByText('Plate type:')
          screen.getByText('Commercial', { selector: 'div' })

          screen.getByText('Violations:')
          screen.getByText('(1 new) 4')

          screen.getByText('Lookups:')
          screen.getByText('2')

          screen.getByText('Prev. Queried:')
          screen.getByText('11/12/2024')

          screen.getByText('Fined:')
          screen.getByText('$500.00')

          screen.getByText('Paid:')
          screen.getByText('$400.00')

          screen.getByText('Owed:')
          screen.getByText('$50.00')

          // ViolationCardListControl component
          screen.getByText('hide violations', { selector: 'button' })

          // ViolationsList component
          screen.getByText('4 parking and camera violations')

          // ViolationsTableHeader
          screen.getByText('Date')
          screen.getByText('Type')
          screen.getByText('Borough')
          screen.getByText('Fines')

          // ViolationsTableBody
          screen.getByText('08/23/2024 3:57 PM')
          screen.getByText('Staten Island')
          screen.getByText('$90.00')
        })
      })
    })

    describe('old-style display', () => {
      it('should populate the lookup on the page when a plate is queried', async () => {
        const performNewLookupSpy = jest.spyOn(
          boundaryFunctions,
          'performNewLookup',
        )

        const violation = ViolationFactory.build({
          amountDue: 15,
          fineAmount: 65,
          formattedTime: '2024-08-23T15:57:14.000-04:00',
          interestAmount: 0.69,
          location: '191 Netherland Ave',
          humanizedDescription: 'Failure to Display Meter Receipt',
          paymentAmount: 75,
          penaltyAmount: 25,
          reductionAmount: 0.69,
          violationCounty: 'Staten Island',
        })

        const vehicle = VehicleFactory.build({
          fines: {
            totalFined: 500,
            totalInJudgment: 25,
            totalOutstanding: 50,
            totalPaid: 400,
            totalReduced: 25,
          },
          plateTypes: [
            'AGC',
            'APP',
            'CHC',
            'CMB',
            'COM',
            'CSP',
            'FAR',
            'HAC',
            'IRP',
            'LOC',
            'ORC',
            'RGC',
            'SPC',
            'STG',
            'THC',
            'TRC',
          ],
          previousLookupDate: '2024-11-12T15:57:14.000Z',
          previousViolationCount: 3,
          violations: [
            ViolationFactory.build(),
            ViolationFactory.build(),
            ViolationFactory.build(),
            violation,
          ],
        })

        performNewLookupSpy.mockResolvedValueOnce({
          data: [
            {
              statusCode: 201,
              successfulLookup: true,
              vehicle,
            },
          ],
        })

        render(
          <CookiesProvider
            cookies={
              new Cookies('lookupIdentifiers=;useNewStyleDisplay=false;')
            }
          >
            <FetchViolations />
          </CookiesProvider>,
        )

        const plate = 'ABC1234'

        const plateSearchInputHtmlElement = screen.getByRole('textbox')
        userEvent.type(plateSearchInputHtmlElement, plate)

        const searchButtonHtmlElement = screen.getByRole('button')
        userEvent.click(searchButtonHtmlElement)

        await waitFor(() => {
          // LookupInfo component
          screen.getByText('Plate:')
          screen.getByText(plate)

          screen.getByText('State:')
          screen.getByText('NY')

          screen.getByText('Plate type:')
          screen.getByText('Commercial', { selector: 'div' })

          screen.getByText('Violations:')
          screen.getByText('(1 new) 4')

          screen.getByText('Lookups:')
          screen.getByText('2')

          screen.getByText('Prev. Queried:')
          screen.getByText('11/12/2024')

          screen.getByText('Fined:')
          screen.getByText('$500.00')

          screen.getByText('Paid:')
          screen.getByText('$400.00')

          screen.getByText('Owed:')
          screen.getByText('$50.00')

          // ViolationsListControl component
          screen.getByText('hide violations', { selector: 'button' })
          screen.getByText('show fines details', { selector: 'button' })
          screen.getByText('show violation summary', { selector: 'button' })

          // ViolationsList component
          screen.getByText('4 parking and camera violations')

          // ViolationsTableHeader
          screen.getByText('Date')
          screen.getByText('Violation')
          screen.getByText('Location')
          screen.getByText('Fines')

          // ViolationsTableBody
          screen.getByText('08/23/2024')
          screen.getByText('Staten Island')
          screen.getByText('(191 Netherland Ave)')
          screen.getByText('$90.00')
        })
      })
    })

    it('should display a message when there is an error', async () => {
      const performNewLookupSpy = jest.spyOn(
        boundaryFunctions,
        'performNewLookup',
      )

      // Simulate failure with three failed retries
      performNewLookupSpy
        .mockRejectedValueOnce(new Error('something broke'))
        .mockRejectedValueOnce(new Error('something broke'))
        .mockRejectedValueOnce(new Error('something broke'))
        .mockRejectedValueOnce(new Error('something broke'))

      render(
        <CookiesProvider cookies={new Cookies('lookupIdentifiers=;')}>
          <FetchViolations />
        </CookiesProvider>,
      )

      const plate = 'ABC1234'

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      userEvent.type(plateSearchInputHtmlElement, plate)

      const searchButtonHtmlElement = screen.getByRole('button')
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        expect(performNewLookupSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            lookupSource: 'web_client',
            plate: 'ABC1234:NY',
          }),
        )

        const alertMessage = screen.getByRole('alert')
        expect(alertMessage).toBeInTheDocument()
        expect(alertMessage.textContent).toEqual('Oops! Please try again.')
      }, { timeout: 10000 })
    }, 12500)

    it('should display an error message from the server if available', async () => {
      const performNewLookupSpy = jest.spyOn(
        boundaryFunctions,
        'performNewLookup',
      )

      performNewLookupSpy.mockRejectedValue({
        body: {
          data: [
            {
              error:
                'Sorry, a plate and state could not be inferred from NYC:NY',
              statusCode: 400,
              successfulLookup: false,
            },
          ],
        },
        ok: false,
        status: 400,
        statusText: '',
        url: 'https://api.howsmydrivingny.nyc',
      })

      render(
        <CookiesProvider cookies={new Cookies('lookupIdentifiers=;')}>
          <FetchViolations />
        </CookiesProvider>,
      )

      const plate = 'NYC'

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      userEvent.type(plateSearchInputHtmlElement, plate)

      const searchButtonHtmlElement = screen.getByRole('button')
      userEvent.click(searchButtonHtmlElement)

      await waitFor(
        () => {
          const alertMessage = screen.getByRole('alert')
          const errorText =
            'Sorry, a plate and state could not be inferred from NYC:NY'
          expect(alertMessage).toBeInTheDocument()
          expect(alertMessage.textContent).toEqual(errorText)

          expect(performNewLookupSpy).toHaveBeenCalledWith(
            expect.objectContaining({
              lookupSource: 'web_client',
              plate: 'NYC:NY',
            }),
          )
        },
        { timeout: 10000 },
      )
    }, 12500)

    it('should not scroll when the lookup errors out', async () => {
      const scrollIntoViewFunction = jest.fn()

      Object.assign(window.HTMLElement.prototype, {
        scrollIntoView: scrollIntoViewFunction,
      })

      const performNewLookupSpy = jest.spyOn(
        boundaryFunctions,
        'performNewLookup',
      )

      // Simulate failure with three failed retries
      performNewLookupSpy
        .mockRejectedValueOnce(new Error('something broke'))
        .mockRejectedValueOnce(new Error('something broke'))
        .mockRejectedValueOnce(new Error('something broke'))
        .mockRejectedValueOnce(new Error('something broke'))

      render(
        <CookiesProvider cookies={new Cookies('lookupIdentifiers=;')}>
          <FetchViolations />
        </CookiesProvider>,
      )

      // reset scroll function to ensure no scrolls *after* search begins
      scrollIntoViewFunction.mockClear()

      const plate = 'ABC1234'

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      userEvent.type(plateSearchInputHtmlElement, plate)

      const searchButtonHtmlElement = screen.getByRole('button')
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        expect(performNewLookupSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            lookupSource: 'web_client',
            plate: 'ABC1234:NY',
          }),
        )

        expect(screen.getByRole('alert')).toBeInTheDocument()
      }, { timeout: 5000 })

      await waitFor(() => {
        expect(scrollIntoViewFunction).not.toHaveBeenCalled()
      })
    })

    it('clicking on the close button of a lookup should remove it from the page', async () => {
      const performNewLookupSpy = jest.spyOn(
        boundaryFunctions,
        'performNewLookup',
      )

      performNewLookupSpy.mockResolvedValueOnce({
        data: [
          {
            statusCode: 201,
            successfulLookup: true,
            vehicle: VehicleFactory.build(),
          },
        ],
      })

      render(
        <CookiesProvider cookies={new Cookies('lookupIdentifiers=;')}>
          <FetchViolations />
        </CookiesProvider>,
      )

      const plate = 'ABC1234'

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      userEvent.type(plateSearchInputHtmlElement, plate)

      const searchButtonHtmlElement = screen.getByRole('button')
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        // Lookup has appeared on the page.
        screen.getByText('Plate:')
        screen.getByText(plate)
      })

      const removeLookupButton = screen.getByLabelText('remove lookup')
      userEvent.click(removeLookupButton)

      await waitFor(() => {
        expect(screen.queryByText('Plate:')).not.toBeInTheDocument()
      })
    })

    it('should copy the link to the lookup when the user presses the copy button of a lookup', async () => {
      const writeText = jest.fn()

      Object.assign(navigator, {
        clipboard: {
          writeText,
        },
      })

      const performNewLookupSpy = jest.spyOn(
        boundaryFunctions,
        'performNewLookup',
      )

      const uniqueIdentifier = 'b8se6all'
      const vehicle = VehicleFactory.build({ uniqueIdentifier })

      performNewLookupSpy.mockResolvedValueOnce({
        data: [
          {
            statusCode: 201,
            successfulLookup: true,
            vehicle,
          },
        ],
      })

      render(
        <CookiesProvider cookies={new Cookies('lookupIdentifiers=;')}>
          <FetchViolations />
        </CookiesProvider>,
      )

      const plate = 'ABC1234'

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      userEvent.type(plateSearchInputHtmlElement, plate)

      const searchButtonHtmlElement = screen.getByRole('button')
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        // Lookup has appeared on the page.
        screen.getByText('Plate:')
        screen.getByText(plate)
      })

      const copyLookupLinkButton = screen.getByLabelText('copy link to lookup')

      await act(async () => {
        // copy lookup link
        userEvent.click(copyLookupLinkButton)
      })

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        `https://howsmydrivingny.nyc/${uniqueIdentifier}`,
      )

      // clean up after ourselves
      Object.assign(navigator, {
        clipboard: undefined,
      })
    })

    it('should open up a new window to share the lookup details to Twitter', async () => {
      const windowOpen = jest.fn()

      Object.assign(window, {
        open: windowOpen,
      })

      const performNewLookupSpy = jest.spyOn(
        boundaryFunctions,
        'performNewLookup',
      )

      const uniqueIdentifier = 'tw1tt3r'
      const vehicle = VehicleFactory.build({ uniqueIdentifier })

      performNewLookupSpy.mockResolvedValueOnce({
        data: [
          {
            statusCode: 201,
            successfulLookup: true,
            vehicle,
          },
        ],
      })

      render(
        <CookiesProvider cookies={new Cookies('lookupIdentifiers=;')}>
          <FetchViolations />
        </CookiesProvider>,
      )

      const plate = 'ABC1234'

      const plateSearchInputHtmlElement = screen.getByRole('textbox')
      userEvent.type(plateSearchInputHtmlElement, plate)

      const searchButtonHtmlElement = screen.getByRole('button')
      userEvent.click(searchButtonHtmlElement)

      await waitFor(() => {
        // Lookup has appeared on the page.
        screen.getByText('Plate:')
        screen.getByText(plate)
      })

      const shareLookupToTwitterButton = screen.getByLabelText(
        'share lookup to Twitter',
      )

      await act(async () => {
        // click on share to Twitter button
        userEvent.click(shareLookupToTwitterButton)
      })

      const twitterBase = 'https://twitter.com/intent/tweet'
      const lookupEncodedUrl = 'https%3A%2F%2Fhowsmydrivingny.nyc%2Ftw1tt3r'
      const twitterEncodedIntentText =
        "I%20just%20looked%20up%20%23NY_ABC1234's%203%20violations%20using%20%40HowsMyDrivingNY%3A%20"

      expect(window.open).toHaveBeenCalledWith(
        `${twitterBase}?url=${lookupEncodedUrl}&text=${twitterEncodedIntentText}`,
        '',
        'height=400, width=550, location=no, toolbar=no, status=no, directories=no, menubar=no, scrollbars=yes, resizable=no, centerscreen=yes, chrome=yes, left=237, top=184',
      )

      // clean up after ourselves
      Object.assign(window, {
        open: undefined,
      })
    })

    it('should open up a previous lookup when there is a cookie of that lookup present', async () => {
      const plate = 'ABC1234'
      const uniqueIdentifier = 'prev10us'
      const vehicle = VehicleFactory.build({ plate, uniqueIdentifier })

      // Set lookupIdentifiers cookie to have a previous lookup unique identifier
      document.cookie = `lookupIdentifiers=${uniqueIdentifier}; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None;`

      const getPreviousLookupSpy = jest.spyOn(
        boundaryFunctions,
        'getPreviousLookup',
      )

      getPreviousLookupSpy.mockResolvedValueOnce({
        data: [
          {
            statusCode: 200,
            successfulLookup: true,
            vehicle,
          },
        ],
      })

      render(
        <CookiesProvider>
          <FetchViolations />
        </CookiesProvider>,
      )

      await waitFor(() => {
        screen.getByText('Plate:')
        screen.getByText(plate)
      })
    })
  })
})
