import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationsList from './ViolationsList'

describe('ViolationsList', () => {
  describe('renders without error', () => {
    test.each([
      {
        showFullFineData: true,
        showFullText: true,
      },
      {
        showFullFineData: true,
        showFullText: false,
      },
      {
        showFullFineData: false,
        showFullText: true,
      },
      {
        showFullFineData: true,
        showFullText: true,
      },
    ])(
      'renders successfully with showFullFineData $showFullFineData and showFullText $showFullText',
      ({ showFullFineData, showFullText }) => {
        const violations = [
          // 2021 violation
          ViolationFactory.build({
            formattedTime: '2021-02-17T14:11:00.000-04:00',
          }),

          // 2018 violation
          ViolationFactory.build({
            formattedTime: '2018-04-26T14:11:00.000-04:00',
          }),
        ]
        const vehicle = VehicleFactory.build({
          violations,
          violationsCount: violations.length,
        })

        render(
          <ViolationsList
            showFullFineData={showFullFineData}
            showFullText={showFullText}
            vehicle={vehicle}
          />,
        )

        const violationsTableElement = screen.getByTestId(
          'vehicle-violations-list',
        )

        // table summary
        expect(violationsTableElement.textContent).toContain(
          `${violations.length} parking and camera violations`,
        )

        // table column headers
        expect(violationsTableElement.textContent).toContain('Date')
        expect(violationsTableElement.textContent).toContain('Violation')
        expect(violationsTableElement.textContent).toContain('Location')
        expect(violationsTableElement.textContent).toContain('Fines')

        // table sort headers
        expect(violationsTableElement.textContent).not.toContain('2023')
        expect(violationsTableElement.textContent).not.toContain('2022')
        expect(violationsTableElement.textContent).toContain('2021')
        expect(violationsTableElement.textContent).not.toContain('2020')
        expect(violationsTableElement.textContent).not.toContain('2019')
        expect(violationsTableElement.textContent).toContain('2018')
        expect(violationsTableElement.textContent).not.toContain('2017')
        expect(violationsTableElement.textContent).not.toContain('2016')
      },
    )
  })

  describe('display text', () => {
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

    describe('displaying violation description', () => {
      it('should display the violation summary icon when showFullText is false', () => {
        render(
          <ViolationsList
            showFullFineData={false}
            showFullText={false}
            vehicle={vehicleWithViolationFines}
          />,
        )

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

      it('should display the full violation description when showFullText is true', () => {
        render(
          <ViolationsList
            showFullFineData={false}
            showFullText={true}
            vehicle={vehicleWithViolationFines}
          />,
        )

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
    })

    describe('displaying violation fines', () => {
      it('should display the summarized fines when showFullFineData is false', () => {
        render(
          <ViolationsList
            showFullFineData={false}
            showFullText={false}
            vehicle={vehicleWithViolationFines}
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
      })

      it('should display the detailed fines when showFullFineData is true', () => {
        render(
          <ViolationsList
            showFullFineData={true}
            showFullText={false}
            vehicle={vehicleWithViolationFines}
          />,
        )

        // Expect summary fine data to be hidden
        // (original fine + penalties + interest - reductions)
        expect(screen.queryByText('$87.00')).toBeFalsy()

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
      })

      it("should display 'In judgment:' instead of 'Oustanding:' when a violation is in judgment ", () => {
        const violationsWithInJudgmentViolation = [
          ViolationFactory.build({
            amountDue: 77,
            fineAmount: 50,
            judgmentEntryDate: '2021-06-03',
          }),
          ViolationFactory.build({
            formattedTime: '2018-04-26T14:11:00.000-04:00',
          }),
        ]

        const vehicleWithInJudgmentViolation = VehicleFactory.build({
          violations: violationsWithInJudgmentViolation,
          violationsCount: violationsWithFines.length,
        })

        render(
          <ViolationsList
            showFullFineData={true}
            showFullText={false}
            vehicle={vehicleWithInJudgmentViolation}
          />,
        )

        expect(screen.queryByText('Outstanding:')).toBeFalsy()
        expect(screen.getByText('In judgment:')).toBeTruthy()
      })
    })
  })

  describe('sorting', () => {
    it('should toggle the sort between ascending and descending if the current sort is clicked', () => {
      render(
        <ViolationsList
          showFullFineData={false}
          showFullText={false}
          vehicle={VehicleFactory.build()}
        />,
      )

      const dateHeaderElement = screen.getByText('Date')

      // assert sort is by date (by default)
      expect(dateHeaderElement).toHaveClass('sort-column')
      // asert sort icon is ascending (by default)
      expect(
        dateHeaderElement.contains(screen.getByTitle('angle-up icon')),
      ).toBeTruthy()

      // toggle sort to descending
      userEvent.click(dateHeaderElement)

      // assert sort is still by date
      expect(dateHeaderElement).toHaveClass('sort-column')
      // assert sort icon is descending
      expect(
        dateHeaderElement.contains(screen.getByTitle('angle-down icon')),
      ).toBeTruthy()

      // toggle sort back to acescending
      userEvent.click(dateHeaderElement)

      // assert sort is still by date
      expect(dateHeaderElement).toHaveClass('sort-column')
      // assert sort icon is ascending again
      expect(
        dateHeaderElement.contains(screen.getByTitle('angle-up icon')),
      ).toBeTruthy()
    })

    it('should toggle the sort to the clicked sort type if another sort is clicked', () => {
      render(
        <ViolationsList
          showFullFineData={false}
          showFullText={false}
          vehicle={VehicleFactory.build()}
        />,
      )

      const dateHeaderElement = screen.getByText('Date')
      const locationHeaderElement = screen.getByText('Location')

      // assert sort is by date (by default)
      expect(dateHeaderElement).toHaveClass('sort-column')
      // asert sort icon is ascending (by default)
      expect(
        dateHeaderElement.contains(screen.getByTitle('angle-up icon')),
      ).toBeTruthy()

      // toggle sort to location
      userEvent.click(locationHeaderElement)

      // assert sort is now by location
      expect(locationHeaderElement).toHaveClass('sort-column')
      // assert sort icon is ascending
      expect(
        locationHeaderElement.contains(screen.getByTitle('angle-up icon')),
      ).toBeTruthy()

      // toggle sort to descending
      userEvent.click(locationHeaderElement)

      // assert sort is still by location
      expect(locationHeaderElement).toHaveClass('sort-column')
      // assert sort icon is descending
      expect(
        locationHeaderElement.contains(screen.getByTitle('angle-down icon')),
      ).toBeTruthy()
    })
  })
})
