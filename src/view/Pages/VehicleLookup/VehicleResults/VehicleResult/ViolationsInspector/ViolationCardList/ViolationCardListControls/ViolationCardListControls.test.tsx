import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationCardListControls from './ViolationCardListControls'

describe('ViolationCardListControls', () => {
  const setViolationsListVisibilityFunction = jest.fn()
  const toggleShowFullFineDataFunction = jest.fn()
  const toggleShowFullLocationDataFunction = jest.fn()

  describe('renders without error', () => {
    test.each([
      {
        listVisibility: 'list is visible',
        violationsStatus: 'has violations',
      },
      {
        listVisibility: 'list is visible',
        violationsStatus: 'has violations',
      },
      {
        listVisibility: 'list is not visible',
        violationsStatus: 'has no violations',
      },
    ])(
      'successfully renders ViolationCardListControls when vehicle $violationsStatus and $listVisibility',
      ({ listVisibility, violationsStatus }) => {
        const hasViolations = violationsStatus === 'has violations'
        const listIsVisible = listVisibility === 'list is visible'

        const violationsDetails = hasViolations
          ? {
            violations: [
              ViolationFactory.build(),
              ViolationFactory.build(),
              ViolationFactory.build(),
            ],
            violationsCount: 3,
          }
          : {
            violations: [],
            violationsCount: 0,
          }

        const vehicle = VehicleFactory.build(violationsDetails)

        const showFullFineData = false
        const showFullLocationData = false

        render(
          <ViolationCardListControls
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            showFullFineData={showFullFineData}
            showFullLocationData={showFullLocationData}
            toggleShowFullFineDataFunction={toggleShowFullFineDataFunction}
            toggleShowFullLocationDataFunction={
              toggleShowFullLocationDataFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={listIsVisible}
          />,
        )

        if (hasViolations && listIsVisible) {
          const hideViolationsButton = screen.getByText('hide violations')

          expect(hideViolationsButton).toBeInTheDocument()
          expect(screen.getByText('show fines details')).toBeInTheDocument()
          expect(screen.getByText('show full location')).toBeInTheDocument()

          userEvent.click(hideViolationsButton)
          expect(setViolationsListVisibilityFunction).toHaveBeenCalledTimes(1)
        } else if (hasViolations && !listIsVisible) {
          const showViolationsButton = screen.getByText('hide violations')

          expect(showViolationsButton).toBeInTheDocument()
          expect(screen.getByText('show 3 violations')).toBeInTheDocument()
          expect(
            screen.queryByText('show fines details'),
          ).not.toBeInTheDocument()
          expect(
            screen.queryByText('show full location'),
          ).not.toBeInTheDocument()

          userEvent.click(showViolationsButton)
          expect(setViolationsListVisibilityFunction).toHaveBeenCalledTimes(1)
        } else if (!hasViolations && !listIsVisible) {
          const disabledNoViolationsButton = screen.getByText('no violations')

          expect(disabledNoViolationsButton).toBeInTheDocument()
          expect(
            screen.queryByText('show fines details'),
          ).not.toBeInTheDocument()
          expect(
            screen.queryByText('show full location'),
          ).not.toBeInTheDocument()

          userEvent.click(disabledNoViolationsButton)
          // button is disabled, click does not trigger function
          expect(setViolationsListVisibilityFunction).not.toHaveBeenCalled()
        } else {
          fail('this scenario is undefined')
        }
      },
    )
  })

  describe('showFullFineData', () => {
    test.each([
      {
        fullFineVisibility: 'showing full fine data',
      },
      {
        fullFineVisibility: 'not showing full fine data',
      },
    ])(
      'should display the correct text when the violations list is visible and we are $fineDataVisibility',
      ({ fullFineVisibility }) => {
        const showFullFineData = fullFineVisibility === 'showing full fine data'

        const vehicle = VehicleFactory.build()

        render(
          <ViolationCardListControls
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            showFullFineData={showFullFineData}
            showFullLocationData={false}
            toggleShowFullFineDataFunction={toggleShowFullFineDataFunction}
            toggleShowFullLocationDataFunction={
              toggleShowFullLocationDataFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={true}
          />,
        )

        if (showFullFineData) {
          const showFinesSummaryButton = screen.getByText('show fines summary')
          expect(showFinesSummaryButton).toBeInTheDocument()

          userEvent.click(showFinesSummaryButton)
        } else {
          const showFinesDetailsButton = screen.getByText('show fines details')
          expect(showFinesDetailsButton).toBeInTheDocument()

          userEvent.click(showFinesDetailsButton)
        }

        expect(toggleShowFullFineDataFunction).toHaveBeenCalledTimes(1)
      },
    )
  })

  describe('showFullLocationData', () => {
    test.each([
      {
        fullLocationVisibility: 'showing full location data',
      },
      {
        fullLocationVisibility: 'not showing full location data',
      },
    ])(
      'should display the correct text when the violations list is visible and we are $fullLocationVisibility',
      ({ fullLocationVisibility }) => {
        const showFullLocationData =
          fullLocationVisibility === 'showing full location data'

        const vehicle = VehicleFactory.build()

        render(
          <ViolationCardListControls
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            showFullFineData={false}
            showFullLocationData={showFullLocationData}
            toggleShowFullFineDataFunction={toggleShowFullFineDataFunction}
            toggleShowFullLocationDataFunction={
              toggleShowFullLocationDataFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={true}
          />,
        )

        if (showFullLocationData) {
          const showLocationSummaryButton = screen.getByText(
            'show location summary',
          )
          expect(showLocationSummaryButton).toBeInTheDocument()

          userEvent.click(showLocationSummaryButton)
        } else {
          const showLocationDetailsButton =
            screen.getByText('show full location')
          expect(showLocationDetailsButton).toBeInTheDocument()

          userEvent.click(showLocationDetailsButton)
        }

        expect(toggleShowFullLocationDataFunction).toHaveBeenCalledTimes(1)
      },
    )
  })
})
