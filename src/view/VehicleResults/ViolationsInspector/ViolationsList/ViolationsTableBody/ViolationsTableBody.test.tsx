import React from 'react'
import { render, screen } from '@testing-library/react'

import { ViolationFactory } from '__fixtures__/models/Violation'

import Sort from 'constants/sortOptions'

import ViolationsTableBody from './ViolationsTableBody'

describe('ViolationsTable', () => {
  describe('renders without error', () => {
    const tableElement = document.createElement('table')

    const violationDate = '11/07/2024'

    const violations = [
      ViolationFactory.build({ getViolationDate: () => violationDate }),
      ViolationFactory.build({ getViolationDate: () => violationDate }),
      ViolationFactory.build({ getViolationDate: () => violationDate }),
    ]

    test.each([
      // Sort.DATE
      {
        showFullFineData: true,
        showFullText: true,
        sortAscending: true,
        sortType: Sort.DATE,
      },
      {
        showFullFineData: true,
        showFullText: true,
        sortAscending: false,
        sortType: Sort.DATE,
      },
      {
        showFullFineData: true,
        showFullText: false,
        sortAscending: true,
        sortType: Sort.DATE,
      },
      {
        showFullFineData: true,
        showFullText: false,
        sortAscending: false,
        sortType: Sort.DATE,
      },
      {
        showFullFineData: false,
        showFullText: true,
        sortAscending: true,
        sortType: Sort.DATE,
      },
      {
        showFullFineData: false,
        showFullText: true,
        sortAscending: false,
        sortType: Sort.DATE,
      },
      {
        showFullFineData: false,
        showFullText: false,
        sortAscending: true,
        sortType: Sort.DATE,
      },
      {
        showFullFineData: false,
        showFullText: false,
        sortAscending: false,
        sortType: Sort.DATE,
      },

      // Sort.FINED
      {
        showFullFineData: true,
        showFullText: true,
        sortAscending: true,
        sortType: Sort.FINED,
      },
      {
        showFullFineData: true,
        showFullText: true,
        sortAscending: false,
        sortType: Sort.FINED,
      },
      {
        showFullFineData: true,
        showFullText: false,
        sortAscending: true,
        sortType: Sort.FINED,
      },
      {
        showFullFineData: true,
        showFullText: false,
        sortAscending: false,
        sortType: Sort.FINED,
      },
      {
        showFullFineData: false,
        showFullText: true,
        sortAscending: true,
        sortType: Sort.FINED,
      },
      {
        showFullFineData: false,
        showFullText: true,
        sortAscending: false,
        sortType: Sort.FINED,
      },
      {
        showFullFineData: false,
        showFullText: false,
        sortAscending: true,
        sortType: Sort.FINED,
      },
      {
        showFullFineData: false,
        showFullText: false,
        sortAscending: false,
        sortType: Sort.FINED,
      },

      // Sort.KIND
      {
        showFullFineData: true,
        showFullText: true,
        sortAscending: true,
        sortType: Sort.KIND,
      },
      {
        showFullFineData: true,
        showFullText: true,
        sortAscending: false,
        sortType: Sort.KIND,
      },
      {
        showFullFineData: true,
        showFullText: false,
        sortAscending: true,
        sortType: Sort.KIND,
      },
      {
        showFullFineData: true,
        showFullText: false,
        sortAscending: false,
        sortType: Sort.KIND,
      },
      {
        showFullFineData: false,
        showFullText: true,
        sortAscending: true,
        sortType: Sort.KIND,
      },
      {
        showFullFineData: false,
        showFullText: true,
        sortAscending: false,
        sortType: Sort.KIND,
      },
      {
        showFullFineData: false,
        showFullText: false,
        sortAscending: true,
        sortType: Sort.KIND,
      },
      {
        showFullFineData: false,
        showFullText: false,
        sortAscending: false,
        sortType: Sort.KIND,
      },

      // Sort.LOCATION
      {
        showFullFineData: true,
        showFullText: true,
        sortAscending: true,
        sortType: Sort.LOCATION,
      },
      {
        showFullFineData: true,
        showFullText: true,
        sortAscending: false,
        sortType: Sort.LOCATION,
      },
      {
        showFullFineData: true,
        showFullText: false,
        sortAscending: true,
        sortType: Sort.LOCATION,
      },
      {
        showFullFineData: true,
        showFullText: false,
        sortAscending: false,
        sortType: Sort.LOCATION,
      },
      {
        showFullFineData: false,
        showFullText: true,
        sortAscending: true,
        sortType: Sort.LOCATION,
      },
      {
        showFullFineData: false,
        showFullText: true,
        sortAscending: false,
        sortType: Sort.LOCATION,
      },
      {
        showFullFineData: false,
        showFullText: false,
        sortAscending: true,
        sortType: Sort.LOCATION,
      },
      {
        showFullFineData: false,
        showFullText: false,
        sortAscending: false,
        sortType: Sort.LOCATION,
      },
    ])(
      'renders successfully with sort type $sortType $sortAscending, showFullFineData $showFullFineData, and showFullText $showFullText',
      ({ showFullFineData, showFullText, sortAscending, sortType }) => {
        render(
          <ViolationsTableBody
            currentSortType={sortType}
            showFullFineData={showFullFineData}
            showFullText={showFullText}
            sortAscending={sortAscending}
            violations={violations}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        const violationHtmlElements = screen.getAllByText(violationDate)
        expect(violationHtmlElements.length).toEqual(violations.length)
      },
    )
  })

  describe('sort order', () => {
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
        formattedTime: '2021-02-17T07:27:00.000-04:00',
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

    describe('by date', () => {
      describe('ascending', () => {
        it('renders the table and sort headers successfully', () => {
          const tableElement = document.createElement('table')

          const violations = [
            busLaneViolationInStatenIslandIn2018WithFewerFines,
            speedCameraViolationInBrooklynIn2021WithMoreFines,
          ]

          render(
            <ViolationsTableBody
              currentSortType={Sort.DATE}
              showFullFineData={false}
              showFullText={false}
              sortAscending={true}
              violations={violations}
            />,
            { container: document.body.appendChild(tableElement) },
          )

          const violationsTableBodyElement: HTMLElement = screen.getByTestId(
            'violations-table-body',
          )

          // Four children, the two violations plus their sort labels by year, should be present
          expect(violationsTableBodyElement.children.length).toEqual(
            violations.length + 2,
          )

          // Assert order of violations
          const violationIn2018 = screen.getByText('04/26/2018')
          const violationIn2021 = screen.getByText('02/17/2021')

          expect(violationIn2018.compareDocumentPosition(violationIn2021)).toBe(
            Node.DOCUMENT_POSITION_FOLLOWING,
          )

          // table sort headers
          expect(
            screen.getByTestId('sort-divider-date-ascending-2018'),
          ).toBeTruthy()
          expect(
            screen.getByTestId('sort-divider-date-ascending-2021'),
          ).toBeTruthy()
        })
      })

      describe('descending', () => {
        it('renders the table and sort headers successfully', () => {
          const tableElement = document.createElement('table')

          const violations = [
            speedCameraViolationInBrooklynIn2021WithMoreFines,
            busLaneViolationInStatenIslandIn2018WithFewerFines,
          ]

          render(
            <ViolationsTableBody
              currentSortType={Sort.DATE}
              showFullFineData={false}
              showFullText={false}
              sortAscending={false}
              violations={violations}
            />,
            { container: document.body.appendChild(tableElement) },
          )

          const violationsTableBodyElement: HTMLElement = screen.getByTestId(
            'violations-table-body',
          )

          // Four children, the two violations plus their sort labels by year, should be present
          expect(violationsTableBodyElement.children.length).toEqual(
            violations.length + 2,
          )

          // Assert order of violations
          const violationIn2018 = screen.getByText('04/26/2018')
          const violationIn2021 = screen.getByText('02/17/2021')

          expect(violationIn2018.compareDocumentPosition(violationIn2021)).toBe(
            Node.DOCUMENT_POSITION_PRECEDING,
          )

          // table sort headers
          expect(
            screen.getByTestId('sort-divider-date-descending-2018'),
          ).toBeTruthy()
          expect(
            screen.getByTestId('sort-divider-date-descending-2021'),
          ).toBeTruthy()
        })
      })
    })

    describe('by fines', () => {
      describe('ascending', () => {
        it('renders the table without sort headers', () => {
          const tableElement = document.createElement('table')

          const violations = [
            speedCameraViolationInBrooklynIn2021WithMoreFines,
            busLaneViolationInStatenIslandIn2018WithFewerFines,
          ]

          render(
            <ViolationsTableBody
              currentSortType={Sort.FINED}
              showFullFineData={false}
              showFullText={false}
              sortAscending={true}
              violations={violations}
            />,
            { container: document.body.appendChild(tableElement) },
          )

          const violationsTableBodyElement: HTMLElement = screen.getByTestId(
            'violations-table-body',
          )

          // Only two children (the two violations) should be present
          expect(violationsTableBodyElement.children.length).toEqual(
            violations.length,
          )

          // Assert order of violations
          const violationWithFewerFines = screen.getByText('$50.00')
          const violationWithMoreFines = screen.getByText('$125.00')

          expect(
            violationWithFewerFines.compareDocumentPosition(
              violationWithMoreFines,
            ),
          ).toBe(Node.DOCUMENT_POSITION_PRECEDING)
        })
      })

      describe('descending', () => {
        it('renders the table without sort headers', () => {
          const tableElement = document.createElement('table')

          const violations = [
            busLaneViolationInStatenIslandIn2018WithFewerFines,
            speedCameraViolationInBrooklynIn2021WithMoreFines,
          ]

          render(
            <ViolationsTableBody
              currentSortType={Sort.FINED}
              showFullFineData={false}
              showFullText={false}
              sortAscending={false}
              violations={violations}
            />,
            { container: document.body.appendChild(tableElement) },
          )

          const violationsTableBodyElement: HTMLElement = screen.getByTestId(
            'violations-table-body',
          )

          // Only two children (the two violations) should be present
          expect(violationsTableBodyElement.children.length).toEqual(
            violations.length,
          )

          // Assert order of violations
          const violationWithFewerFines = screen.getByText('$50.00')
          const violationWithMoreFines = screen.getByText('$125.00')

          expect(
            violationWithFewerFines.compareDocumentPosition(
              violationWithMoreFines,
            ),
          ).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
        })
      })
    })

    describe('by kind', () => {
      describe('ascending', () => {
        it('renders the table without sort headers', () => {
          const tableElement = document.createElement('table')

          const violations = [
            busLaneViolationInStatenIslandIn2018WithFewerFines,
            speedCameraViolationInBrooklynIn2021WithMoreFines,
          ]

          render(
            <ViolationsTableBody
              currentSortType={Sort.KIND}
              showFullFineData={false}
              showFullText={false}
              sortAscending={true}
              violations={violations}
            />,
            { container: document.body.appendChild(tableElement) },
          )

          const violationsTableBodyElement: HTMLElement = screen.getByTestId(
            'violations-table-body',
          )

          // Only two children (the two violations) should be present
          expect(violationsTableBodyElement.children.length).toEqual(
            violations.length,
          )

          // Assert order of violations
          const violationEarlierAlphabetically = screen.getByTitle('bus icon')
          const violationLaterAlphabetically = screen.getByText(
            'tachometer-alt icon',
          )

          expect(
            violationEarlierAlphabetically.compareDocumentPosition(
              violationLaterAlphabetically,
            ),
          ).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
        })
      })

      describe('descending', () => {
        it('renders the table without sort headers', () => {
          const tableElement = document.createElement('table')

          const violations = [
            speedCameraViolationInBrooklynIn2021WithMoreFines,
            busLaneViolationInStatenIslandIn2018WithFewerFines,
          ]

          render(
            <ViolationsTableBody
              currentSortType={Sort.KIND}
              showFullFineData={false}
              showFullText={false}
              sortAscending={false}
              violations={violations}
            />,
            { container: document.body.appendChild(tableElement) },
          )

          const violationsTableBodyElement: HTMLElement = screen.getByTestId(
            'violations-table-body',
          )

          // Only two children (the two violations) should be present
          expect(violationsTableBodyElement.children.length).toEqual(
            violations.length,
          )

          // Assert order of violations
          const violationEarlierAlphabetically = screen.getByTitle('bus icon')
          const violationLaterAlphabetically = screen.getByTitle(
            'tachometer-alt icon',
          )

          expect(
            violationEarlierAlphabetically.compareDocumentPosition(
              violationLaterAlphabetically,
            ),
          ).toBe(Node.DOCUMENT_POSITION_PRECEDING)
        })
      })
    })

    describe('by location', () => {
      describe('ascending', () => {
        it('renders the table and sort headers successfully', () => {
          const tableElement = document.createElement('table')

          const violations = [
            speedCameraViolationInBrooklynIn2021WithMoreFines,
            busLaneViolationInStatenIslandIn2018WithFewerFines,
          ]

          render(
            <ViolationsTableBody
              currentSortType={Sort.LOCATION}
              showFullFineData={false}
              showFullText={true}
              sortAscending={true}
              violations={violations}
            />,
            { container: document.body.appendChild(tableElement) },
          )

          const violationsTableBodyElement: HTMLElement = screen.getByTestId(
            'violations-table-body',
          )

          // Four children, the two violations plus their sort labels by year, should be present
          expect(violationsTableBodyElement.children.length).toEqual(
            violations.length + 2,
          )

          // Assert order of violations
          const violationWithEarlierBoroughAlphabetically = screen.getByText(
            '(Jay Street @ Johnson Street)',
          )
          const violationWithLaterBoroughAlphabetically =
            screen.getByText('(123 Bay Street)')

          expect(
            violationWithEarlierBoroughAlphabetically.compareDocumentPosition(
              violationWithLaterBoroughAlphabetically,
            ),
          ).toBe(Node.DOCUMENT_POSITION_FOLLOWING)

          // table sort headers
          expect(
            screen.getByTestId('sort-divider-location-ascending-brooklyn'),
          ).toBeTruthy()
          expect(
            screen.getByTestId('sort-divider-location-ascending-staten-island'),
          ).toBeTruthy()
        })
      })

      describe('descending', () => {
        it('renders the table and sort headers successfully', () => {
          const tableElement = document.createElement('table')

          const violations = [
            busLaneViolationInStatenIslandIn2018WithFewerFines,
            speedCameraViolationInBrooklynIn2021WithMoreFines,
          ]

          render(
            <ViolationsTableBody
              currentSortType={Sort.LOCATION}
              showFullFineData={false}
              showFullText={true}
              sortAscending={false}
              violations={violations}
            />,
            { container: document.body.appendChild(tableElement) },
          )

          const violationsTableBodyElement: HTMLElement = screen.getByTestId(
            'violations-table-body',
          )

          // Four children, the two violations plus their sort labels by year, should be present
          expect(violationsTableBodyElement.children.length).toEqual(
            violations.length + 2,
          )

          // Assert order of violations
          const violationWithEarlierBoroughAlphabetically = screen.getByText(
            '(Jay Street @ Johnson Street)',
          )
          const violationWithLaterBoroughAlphabetically =
            screen.getByText('(123 Bay Street)')

          expect(
            violationWithEarlierBoroughAlphabetically.compareDocumentPosition(
              violationWithLaterBoroughAlphabetically,
            ),
          ).toBe(Node.DOCUMENT_POSITION_PRECEDING)

          // table sort headers
          expect(
            screen.getByTestId('sort-divider-location-descending-brooklyn'),
          ).toBeTruthy()
          expect(
            screen.getByTestId(
              'sort-divider-location-descending-staten-island',
            ),
          ).toBeTruthy()
        })
      })
    })
  })
})
