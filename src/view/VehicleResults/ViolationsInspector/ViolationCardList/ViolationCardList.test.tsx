import React from 'react'
import { render, screen } from '@testing-library/react'

import { VehicleFactory } from '__fixtures__/models/Vehicle'
import { ViolationFactory } from '__fixtures__/models/Violation'

import Violation from 'models/Violation/Violation'

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

  it('should render the right caption depending on the number of violations', () => {
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

  test.each([
    {
      violationsCount: 0,
    },
    {
      violationsCount: 1,
    },
    {
      violationsCount: 2,
    },
  ])(
    'should render the right caption when the number of violations is $violationsCount',
    ({ violationsCount }) => {
      const violations: Violation[] = new Array(violationsCount).fill(
        ViolationFactory.build(),
      )

      const vehicle = VehicleFactory.build({
        violations,
        violationsCount: violations.length,
      })

      render(
        <ViolationCardList
          setViolationsListVisibilityFunction={setViolationsListVisibility}
          vehicle={vehicle}
          violationsListIsVisible={true}
        />,
      )

      if (!violationsCount) {
        expect(
          screen.queryByText('parking and camera violation'),
        ).not.toBeInTheDocument()
      } else if (violationsCount === 1) {
        expect(
          screen.getByText('1 parking and camera violation'),
        ).toBeInTheDocument()
      } else if (violationsCount === 2) {
        expect(
          screen.getByText('2 parking and camera violations'),
        ).toBeInTheDocument()
      } else {
        fail('number of violations is unexpected')
      }
    },
  )
})
