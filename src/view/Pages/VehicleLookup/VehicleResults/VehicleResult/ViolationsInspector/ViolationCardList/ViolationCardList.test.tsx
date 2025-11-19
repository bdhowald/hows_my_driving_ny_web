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

  it('should render sort headers successfully', () => {
    // violation
    //   by date:
    //     ↑: 1st
    //     ↓: 2nd
    //   by fines:
    //     ↑: 2nd
    //     ↓: 1st
    //   by kind:
    //     ↑: 1st
    //     ↓: 2nd
    //   by location:
    //     ↑: 2nd
    //     ↓: 1st
    const busLaneViolationInStatenIslandIn2018WithFewerFines =
      ViolationFactory.build({
        amountDue: 50,
        fineAmount: 50,
        formattedTime: '2018-04-26T14:11:00.000-04:00',
        getBorough: () => 'Staten Island',
        getLocationDescription: () => '123 Bay Street',
        getViolationDate: () => '04/26/2018',
        humanizedDescription: 'Bus Lane Violation',
        interestAmount: 0,
        paymentAmount: 0,
        penaltyAmount: 0,
        reductionAmount: 0,
        violationCode: '5',
      })

    // violation
    //   by date:
    //     ↑: 2nd
    //     ↓: 1st
    //   by fines:
    //     ↑: 1st
    //     ↓: 2nd
    //   by kind:
    //     ↑: 2nd
    //     ↓: 1st
    //   by location:
    //     ↑: 1st
    //     ↓: 2nd
    const speedCameraViolationInBrooklynIn2021WithMoreFines =
      ViolationFactory.build({
        amountDue: 105,
        fineAmount: 100,
        formattedTime: '2021-02-17T07:27:00.000-05:00',
        getBorough: () => 'Brooklyn',
        getLocationDescription: () => 'Jay Street @ Johnson Street',
        getViolationDate: () => '02/17/2021',
        humanizedDescription: 'School Zone Speed Camera Violation',
        interestAmount: 10,
        paymentAmount: 20,
        penaltyAmount: 25,
        reductionAmount: 10,
        violationCode: '36',
      })

    const violations = [
      busLaneViolationInStatenIslandIn2018WithFewerFines,
      speedCameraViolationInBrooklynIn2021WithMoreFines,
    ]

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

    const violationCardListElement: HTMLElement = screen.getByTestId(
      'violation-card-list',
    )

    // Four children, the two violations plus their sort labels by year, should be present
    expect(violationCardListElement.children.length).toEqual(
      violations.length + 2,
    )

    // Assert order of violations
    const violationIn2018 = screen.getByText('04/26/2018 2:11 PM')
    const violationIn2021 = screen.getByText('02/17/2021 7:27 AM')

    expect(violationIn2018.compareDocumentPosition(violationIn2021)).toBe(
      Node.DOCUMENT_POSITION_PRECEDING,
    )

    // table sort headers
    expect(screen.getByTestId('sort-divider-date-descending-2018')).toBeTruthy()
    expect(screen.getByTestId('sort-divider-date-descending-2021')).toBeTruthy()
  })
})
