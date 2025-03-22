import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import ViolationCardList from './ViolationCardList'

describe('ViolationCardList', () => {
  const setViolationsListVisibility = () => null

  describe('renders without error', () => {
    test.each([
      {
        listIsVisible: 'visible',
      },
      {
        listIsVisible: 'not visible',
      },
    ])(
      'successfully renders ViolationCardList when the violation list is $listIsVisible',
      ({ listIsVisible }) => {
        const violationsListIsVisible = listIsVisible === 'visible'

        const vehicle = VehicleFactory.build()

        render(
          <ViolationCardList
            setViolationsListVisibilityFunction={setViolationsListVisibility}
            vehicle={vehicle}
            violationsListIsVisible={violationsListIsVisible}
          />,
        )
      },
    )
  })

  it('should render the right controls and sort controls when the list is visible', () => {
    const vehicle = VehicleFactory.build()

    render(
      <ViolationCardList
        setViolationsListVisibilityFunction={setViolationsListVisibility}
        vehicle={vehicle}
        violationsListIsVisible={true}
      />,
    )

    // list controls
    expect(screen.getByText('hide violations')).toBeInTheDocument()

    // list sort controls
    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('Borough')).toBeInTheDocument()
    expect(screen.getByText('Fines')).toBeInTheDocument()
  })

  it('should render the violation card details when the list is visible', () => {
    const violation = ViolationFactory.build({
      fineAmount: 60,
      getTotalFined: () => 95,
      interestAmount: 10.11,
      penaltyAmount: 25,
      reductionAmount: 0.11,
    })
    const vehicle = VehicleFactory.build({
      violations: [violation],
    })

    render(
      <ViolationCardList
        setViolationsListVisibilityFunction={setViolationsListVisibility}
        vehicle={vehicle}
        violationsListIsVisible={true}
      />,
    )

    const fineString = `$${violation.getTotalFined()}.00`

    // violation datetime
    expect(
      screen.getByText(violation.getViolationDateTime()),
    ).toBeInTheDocument()

    // violation type
    expect(screen.getByText(violation.humanizedDescription)).toBeInTheDocument()

    // violation borough
    expect(screen.getByText(violation.getBorough())).toBeInTheDocument()

    // violation fines
    expect(screen.getByText(fineString)).toBeInTheDocument()
  })
})
