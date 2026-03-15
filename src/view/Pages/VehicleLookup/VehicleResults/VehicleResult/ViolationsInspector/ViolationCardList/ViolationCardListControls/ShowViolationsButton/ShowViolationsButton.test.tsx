import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ShowViolationsButton from './ShowViolationsButton'

describe('ShowViolationsButton', () => {
  const setViolationsListVisibilityFunction = () => null

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

        render(
          <ShowViolationsButton
            setViolationsListVisibilityFunction={
              setViolationsListVisibilityFunction
            }
            vehicle={vehicle}
            violationsListIsVisible={listIsVisible}
          />,
        )

        if (hasViolations && listIsVisible) {
          expect(screen.getByText('hide violations')).toBeInTheDocument()
        } else if (hasViolations && !listIsVisible) {
          expect(screen.getByText('show 3 violations')).toBeInTheDocument()
        } else if (!hasViolations && !listIsVisible) {
          expect(screen.getByText('no violations')).toBeInTheDocument()
        } else {
          fail('this scenario is undefined')
        }
      },
    )
  })
})
