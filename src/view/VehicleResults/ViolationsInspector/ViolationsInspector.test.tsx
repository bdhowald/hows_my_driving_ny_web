import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationsInspector from './ViolationsInspector'

describe('ViolationsInspector', () => {
  let savedGlobalWidth: number

  beforeEach(() => {
    savedGlobalWidth = global.innerWidth
  })

  afterEach(() => {
    global.innerWidth = savedGlobalWidth
  })

  const violations = [
    ViolationFactory.build({
      amountDue: 77,
      fineAmount: 50,
      formattedTime: '2021-02-17T14:11:00.000-04:00',
      humanizedDescription: 'School Zone Speed Camera Violation',
      interestAmount: 12.69,
      location: 'Victory Blvd. @ Eddy St.',
      judgmentEntryDate: '2021-06-03',
      paymentAmount: 10,
      penaltyAmount: 25,
      reductionAmount: 0.69,
      violationCode: '36',
      violationCounty: 'Staten Island',
    }),
    ViolationFactory.build({
      formattedTime: '2018-04-26T14:11:00.000-04:00',
    }),
  ]

  const vehicle = VehicleFactory.build({
    violations,
    violationsCount: violations.length,
  })

  describe('renders without error', () => {
    test.each([
      {
        showViolationsList: true,
        pageWidth: 512,
      },
      {
        showViolationsList: true,
        pageWidth: 1024,
      },
      {
        showViolationsList: false,
        pageWidth: 512,
      },
      {
        showViolationsList: false,
        pageWidth: 1024,
      },
    ])(
      'renders successfully when showViolationsList is $showViolationsList and page width is $pageWidth',
      ({ showViolationsList, pageWidth }) => {
        // Change the viewport to show/hide full violation text
        global.innerWidth = pageWidth

        // Trigger the window resize event.
        global.dispatchEvent(new Event('resize'))

        render(
          <ViolationsInspector
            vehicle={vehicle}
            showViolationsList={showViolationsList}
          />,
        )

        // Expect list controls to be visible
        expect(screen.getByTestId('vehicle-violations-controls')).toBeTruthy()

        if (showViolationsList) {
          // Expect list to be visible
          expect(screen.getByTestId('vehicle-violations-list')).toBeTruthy()
        } else {
          // Expect list to not be visible
          expect(screen.queryByTestId('vehicle-violations-list')).toBeFalsy()
        }
      },
    )
  })

  describe('use control buttons to toggle list features', () => {
    describe('show/hide the violations list', () => {
      it('should hide the violations list when the list is visible and the ShowViolationsButton is clicked', () => {
        render(<ViolationsInspector vehicle={vehicle} showViolationsList />)

        // Expect list to be visible
        expect(screen.getByTestId('vehicle-violations-list')).toBeTruthy()

        const showViolationsButtonElement = screen.getByText('hide violations')

        userEvent.click(showViolationsButtonElement)

        // Expect list to not be visible now
        expect(screen.queryByTestId('vehicle-violations-list')).toBeFalsy()
      })

      it('should reveal the violations list when the list is visible and the ShowViolationsButton is clicked', () => {
        render(
          <ViolationsInspector vehicle={vehicle} showViolationsList={false} />,
        )

        // Expect list to not be visible
        expect(screen.queryByTestId('vehicle-violations-list')).toBeFalsy()

        const showViolationsButtonElement =
          screen.getByText('show 2 violations')

        userEvent.click(showViolationsButtonElement)

        // Expect list to be visible now
        expect(screen.getByTestId('vehicle-violations-list')).toBeTruthy()
      })
    })
  })

  describe('toggle the full violation text', () => {
    it('should replace violation summary icon with the full violation text when the ShowFullViolationTextButton is clicked', () => {
      // Change the viewport to less than 768px to hide the full violation text
      global.innerWidth = 500

      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'))

      render(<ViolationsInspector vehicle={vehicle} showViolationsList />)

      // Expect full violation text to be hidden
      expect(
        screen.queryByText('School Zone Speed Camera Violation'),
      ).toBeFalsy()
      // Expect violation icon to be visible
      expect(screen.getByTitle('tachometer-alt icon')).toBeTruthy()

      // Expect full violation location to be hidden
      expect(screen.queryByText('(Victory Blvd. @ Eddy St.)')).toBeFalsy()
      // Expect borough to be visible
      expect(screen.getByText('Staten Island')).toBeTruthy()

      const showFullViolationTextButtonElement = screen.getByText(
        'show full violation',
      )

      userEvent.click(showFullViolationTextButtonElement)

      // Expect full violation text to be visible
      expect(
        screen.getByText('School Zone Speed Camera Violation'),
      ).toBeTruthy()
      // Expect violation icon to be hidden
      expect(screen.queryByTitle('tachometer-alt icon')).toBeFalsy()

      // Expect full violation location to be visible
      expect(screen.getByText('(Victory Blvd. @ Eddy St.)')).toBeTruthy()
      // Expect borough to still be visible
      expect(screen.getByText('Staten Island')).toBeTruthy()
    })

    it('should replace the full violation text with violation summary icon when the ShowFullViolationTextButton is clicked', () => {
      // Change the viewport to less than 768px to hide the full violation text
      global.innerWidth = 1024

      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'))

      render(<ViolationsInspector vehicle={vehicle} showViolationsList />)

      // Expect full violation text to be visible
      expect(
        screen.getByText('School Zone Speed Camera Violation'),
      ).toBeTruthy()
      // Expect violation icon to be hidden
      expect(screen.queryByTitle('tachometer-alt icon')).toBeFalsy()

      // Expect full violation location to be visible
      expect(screen.getByText('(Victory Blvd. @ Eddy St.)')).toBeTruthy()
      // Expect borough to still be visible
      expect(screen.getByText('Staten Island')).toBeTruthy()

      const showViolationSummaryTextButtonElement = screen.getByText(
        'show violation summary',
      )

      userEvent.click(showViolationSummaryTextButtonElement)

      // Expect full violation text to be hidden
      expect(
        screen.queryByText('School Zone Speed Camera Violation'),
      ).toBeFalsy()
      // Expect violation icon to be visible
      expect(screen.getByTitle('tachometer-alt icon')).toBeTruthy()

      // Expect full violation location to be hidden
      expect(screen.queryByText('(Victory Blvd. @ Eddy St.)')).toBeFalsy()
      // Expect borough to be visible
      expect(screen.getByText('Staten Island')).toBeTruthy()
    })
  })

  describe('toggle the full violation fines', () => {
    it('should replace the summary fine data with full fine data when the ShowFullFineDataButton is clicked', () => {
      const violationsWithFines = [
        ViolationFactory.build({
          amountDue: 77,
          fineAmount: 50,
          formattedTime: '2021-02-17T14:11:00.000-04:00',
          humanizedDescription: 'School Zone Speed Camera Violation',
          interestAmount: 12.69,
          location: 'Victory Blvd. @ Eddy St.',
          paymentAmount: 10,
          penaltyAmount: 25,
          reductionAmount: 0.69,
          violationCode: '36',
          violationCounty: 'Staten Island',
        }),
        ViolationFactory.build({
          formattedTime: '2018-04-26T14:11:00.000-04:00',
        }),
      ]

      const vehicleWithViolationFines = VehicleFactory.build({
        violations: violationsWithFines,
        violationsCount: violationsWithFines.length,
      })

      render(
        <ViolationsInspector
          vehicle={vehicleWithViolationFines}
          showViolationsList
        />,
      )

      // Expect summary fine data to be visible
      // (original fine + penalties + interest - reductions)
      expect(screen.getByText('$87.00')).toBeTruthy()

      // Expect individual fine data facets to be hidden
      // initial
      expect(screen.queryByText('Initial:')).toBeFalsy()
      expect(screen.queryByText('$50.00')).toBeFalsy()

      // interest
      expect(screen.queryByText('Interest:')).toBeFalsy()
      expect(screen.queryByText('$12.69')).toBeFalsy()

      // interest
      expect(screen.queryByText('Penalties:')).toBeFalsy()
      expect(screen.queryByText('$25.00')).toBeFalsy()

      // total
      expect(screen.queryByText('Total:')).toBeFalsy()
      expect(screen.queryByText('$87.69')).toBeFalsy()

      // reduction
      expect(screen.queryByText('Reductions:')).toBeFalsy()
      expect(screen.queryByText('$87.69')).toBeFalsy()

      // paid
      expect(screen.queryByText('Reductions:')).toBeFalsy()
      expect(screen.queryByText('$10.00')).toBeFalsy()

      // outstanding
      expect(screen.queryByText('Outstanding:')).toBeFalsy()
      expect(screen.queryByText('$77.00')).toBeFalsy()

      const showFinesDetailsTextButtonElement =
        screen.getByText('show fines details')

      userEvent.click(showFinesDetailsTextButtonElement)

      // Expect individual fine data facets to be visible
      // initial
      expect(screen.getByText('Initial:')).toBeTruthy()
      expect(screen.getByText('$50.00')).toBeTruthy()

      // interest
      expect(screen.getByText('Interest:')).toBeTruthy()
      expect(screen.getByText('$12.69')).toBeTruthy()

      // interest
      expect(screen.getByText('Penalties:')).toBeTruthy()
      expect(screen.getByText('$25.00')).toBeTruthy()

      // total
      expect(screen.getByText('Total:')).toBeTruthy()
      expect(screen.getByText('$87.69')).toBeTruthy()

      // reduction
      expect(screen.getByText('Reductions:')).toBeTruthy()
      expect(screen.getByText('$87.69')).toBeTruthy()

      // paid
      expect(screen.getByText('Reductions:')).toBeTruthy()
      expect(screen.getByText('$10.00')).toBeTruthy()

      // outstanding
      expect(screen.getByText('Outstanding:')).toBeTruthy()
      expect(screen.getByText('$77.00')).toBeTruthy()

      // If the button is clicked again, the fines should be hidden
      userEvent.click(showFinesDetailsTextButtonElement)

      // Expect individual fine data facets to be hidden
      // initial
      expect(screen.queryByText('Initial:')).toBeFalsy()
      expect(screen.queryByText('$50.00')).toBeFalsy()

      // interest
      expect(screen.queryByText('Interest:')).toBeFalsy()
      expect(screen.queryByText('$12.69')).toBeFalsy()

      // interest
      expect(screen.queryByText('Penalties:')).toBeFalsy()
      expect(screen.queryByText('$25.00')).toBeFalsy()

      // total
      expect(screen.queryByText('Total:')).toBeFalsy()
      expect(screen.queryByText('$87.69')).toBeFalsy()

      // reduction
      expect(screen.queryByText('Reductions:')).toBeFalsy()
      expect(screen.queryByText('$87.69')).toBeFalsy()

      // paid
      expect(screen.queryByText('Reductions:')).toBeFalsy()
      expect(screen.queryByText('$10.00')).toBeFalsy()

      // outstanding
      expect(screen.queryByText('Outstanding:')).toBeFalsy()
      expect(screen.queryByText('$77.00')).toBeFalsy()
    })
  })
})
