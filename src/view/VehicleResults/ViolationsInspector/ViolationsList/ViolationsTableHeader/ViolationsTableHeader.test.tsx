import React from 'react'
import { render, screen } from '@testing-library/react'

import Sort from 'constants/sortOptions'

import ViolationsTableHeader from './ViolationsTableHeader'

describe('ViolationsTableHeader', () => {
  const tableElement = document.createElement('table')

  const updateSortFunction = () => null

  describe('renders without error', () => {
    test.each([
      // Sort.DATE
      {
        sortAscending: true,
        sortType: Sort.DATE,
      },
      {
        sortAscending: false,
        sortType: Sort.DATE,
      },

      // Sort.FINED
      {
        sortAscending: true,
        sortType: Sort.FINED,
      },
      {
        sortAscending: false,
        sortType: Sort.FINED,
      },

      // Sort.KIND
      {
        sortAscending: true,
        sortType: Sort.KIND,
      },
      {
        sortAscending: false,
        sortType: Sort.KIND,
      },

      // Sort.LOCATION
      {
        sortAscending: true,
        sortType: Sort.LOCATION,
      },
      {
        sortAscending: false,
        sortType: Sort.LOCATION,
      },
    ])(
      'renders successfully sorting by $sortType and sort ascending is $sortAscending',
      ({ sortAscending, sortType }) => {
        render(
          <ViolationsTableHeader
            currentSortType={sortType}
            sortAscending={sortAscending}
            updateSortFunction={updateSortFunction}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        // Assert column headers present
        const dateHeaderElement = screen.getByText('Date')
        const finesHeaderElement = screen.getByText('Fines')
        const locationHeaderElement = screen.getByText('Location')
        const violationHeaderElement = screen.getByText('Violation')

        expect(dateHeaderElement).toBeTruthy()
        expect(finesHeaderElement).toBeTruthy()
        expect(locationHeaderElement).toBeTruthy()
        expect(violationHeaderElement).toBeTruthy()

        // Assert sort icon is present
        const iconName = sortAscending ? 'angle-up icon' : 'angle-down icon'
        const sortIcon = screen.getByTitle(iconName)
        expect(sortIcon).toBeTruthy()
      },
    )
  })

  describe('sort icon', () => {
    describe('attaches the right sort icon to the right column', () => {
      it('the date header should contain the ascending icon when the sort type is by date ascending', () => {
        render(
          <ViolationsTableHeader
            currentSortType={Sort.DATE}
            sortAscending={true}
            updateSortFunction={updateSortFunction}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        const dateHeaderElement = screen.getByText('Date')
        const finesHeaderElement = screen.getByText('Fines')
        const locationHeaderElement = screen.getByText('Location')
        const violationHeaderElement = screen.getByText('Violation')

        const sortIcon = screen.getByTitle('angle-up icon')

        expect(dateHeaderElement.contains(sortIcon)).toBeTruthy()
        expect(finesHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(locationHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(violationHeaderElement.contains(sortIcon)).toBeFalsy()

        expect(dateHeaderElement).toHaveClass('sort-column')
      })

      it('the date header should contain the descending icon when the sort type is by date descending', () => {
        render(
          <ViolationsTableHeader
            currentSortType={Sort.DATE}
            sortAscending={false}
            updateSortFunction={updateSortFunction}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        const dateHeaderElement = screen.getByText('Date')
        const finesHeaderElement = screen.getByText('Fines')
        const locationHeaderElement = screen.getByText('Location')
        const violationHeaderElement = screen.getByText('Violation')

        const sortIcon = screen.getByTitle('angle-down icon')

        expect(dateHeaderElement.contains(sortIcon)).toBeTruthy()
        expect(finesHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(locationHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(violationHeaderElement.contains(sortIcon)).toBeFalsy()

        expect(dateHeaderElement).toHaveClass('sort-column')
      })

      it('the fines header should contain the ascending icon when the sort type is by fines ascending', () => {
        render(
          <ViolationsTableHeader
            currentSortType={Sort.FINED}
            sortAscending={true}
            updateSortFunction={updateSortFunction}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        const dateHeaderElement = screen.getByText('Date')
        const finesHeaderElement = screen.getByText('Fines')
        const locationHeaderElement = screen.getByText('Location')
        const violationHeaderElement = screen.getByText('Violation')

        const sortIcon = screen.getByTitle('angle-up icon')

        expect(dateHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(finesHeaderElement.contains(sortIcon)).toBeTruthy()
        expect(locationHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(violationHeaderElement.contains(sortIcon)).toBeFalsy()

        expect(finesHeaderElement).toHaveClass('sort-column')
      })

      it('the fines header should contain the descending icon when the sort type is by fines descending', () => {
        render(
          <ViolationsTableHeader
            currentSortType={Sort.FINED}
            sortAscending={false}
            updateSortFunction={updateSortFunction}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        const dateHeaderElement = screen.getByText('Date')
        const finesHeaderElement = screen.getByText('Fines')
        const locationHeaderElement = screen.getByText('Location')
        const violationHeaderElement = screen.getByText('Violation')

        const sortIcon = screen.getByTitle('angle-down icon')

        expect(dateHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(finesHeaderElement.contains(sortIcon)).toBeTruthy()
        expect(locationHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(violationHeaderElement.contains(sortIcon)).toBeFalsy()

        expect(finesHeaderElement).toHaveClass('sort-column')
      })

      it('the violation header should contain the ascending icon when the sort type is by kind ascending', () => {
        render(
          <ViolationsTableHeader
            currentSortType={Sort.KIND}
            sortAscending={true}
            updateSortFunction={updateSortFunction}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        const dateHeaderElement = screen.getByText('Date')
        const finesHeaderElement = screen.getByText('Fines')
        const locationHeaderElement = screen.getByText('Location')
        const violationHeaderElement = screen.getByText('Violation')

        const sortIcon = screen.getByTitle('angle-up icon')

        expect(dateHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(finesHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(locationHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(violationHeaderElement.contains(sortIcon)).toBeTruthy()

        expect(violationHeaderElement).toHaveClass('sort-column')
      })

      it('the violation header should contain the descending icon when the sort type is by kind descending', () => {
        render(
          <ViolationsTableHeader
            currentSortType={Sort.KIND}
            sortAscending={false}
            updateSortFunction={updateSortFunction}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        const dateHeaderElement = screen.getByText('Date')
        const finesHeaderElement = screen.getByText('Fines')
        const locationHeaderElement = screen.getByText('Location')
        const violationHeaderElement = screen.getByText('Violation')

        const sortIcon = screen.getByTitle('angle-down icon')

        expect(dateHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(finesHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(locationHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(violationHeaderElement.contains(sortIcon)).toBeTruthy()

        expect(violationHeaderElement).toHaveClass('sort-column')
      })

      it('the location header should contain the ascending icon when the sort type is by location ascending', () => {
        render(
          <ViolationsTableHeader
            currentSortType={Sort.LOCATION}
            sortAscending={true}
            updateSortFunction={updateSortFunction}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        const dateHeaderElement = screen.getByText('Date')
        const finesHeaderElement = screen.getByText('Fines')
        const locationHeaderElement = screen.getByText('Location')
        const violationHeaderElement = screen.getByText('Violation')

        const sortIcon = screen.getByTitle('angle-up icon')

        expect(dateHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(finesHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(locationHeaderElement.contains(sortIcon)).toBeTruthy()
        expect(violationHeaderElement.contains(sortIcon)).toBeFalsy()

        expect(locationHeaderElement).toHaveClass('sort-column')
      })

      it('the location header should contain the descending icon when the sort type is by location descending', () => {
        render(
          <ViolationsTableHeader
            currentSortType={Sort.LOCATION}
            sortAscending={false}
            updateSortFunction={updateSortFunction}
          />,
          { container: document.body.appendChild(tableElement) },
        )

        const dateHeaderElement = screen.getByText('Date')
        const finesHeaderElement = screen.getByText('Fines')
        const locationHeaderElement = screen.getByText('Location')
        const violationHeaderElement = screen.getByText('Violation')

        const sortIcon = screen.getByTitle('angle-down icon')

        expect(dateHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(finesHeaderElement.contains(sortIcon)).toBeFalsy()
        expect(locationHeaderElement.contains(sortIcon)).toBeTruthy()
        expect(violationHeaderElement.contains(sortIcon)).toBeFalsy()

        expect(locationHeaderElement).toHaveClass('sort-column')
      })
    })
  })
})
