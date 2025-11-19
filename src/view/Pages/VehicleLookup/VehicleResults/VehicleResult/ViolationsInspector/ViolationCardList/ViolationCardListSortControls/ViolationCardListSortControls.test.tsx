import React from 'react'
import { render, screen } from '@testing-library/react'

import Sort from 'constants/sortOptions'

import ViolationCardListSortControls from './ViolationCardListSortControls'

describe('ViolationCardListSortControls', () => {
  const updateSort = () => null

  describe('renders without error', () => {
    test.each([
      {
        sortAscending: true,
        sortType: Sort.DATE,
      },
      {
        sortAscending: false,
        sortType: Sort.DATE,
      },
      {
        sortAscending: true,
        sortType: Sort.FINED,
      },
      {
        sortAscending: false,
        sortType: Sort.FINED,
      },
      {
        sortAscending: true,
        sortType: Sort.KIND,
      },
      {
        sortAscending: false,
        sortType: Sort.KIND,
      },
      {
        sortAscending: true,
        sortType: Sort.LOCATION,
      },
      {
        sortAscending: false,
        sortType: Sort.LOCATION,
      },
    ])(
      'successfully renders ViolationCardListSortControls sorting by $sortType and ascending $sortAscending',
      ({ sortAscending, sortType }) => {
        render(
          <ViolationCardListSortControls
            currentSortType={sortType}
            sortAscending={sortAscending}
            updateSortFunction={updateSort}
          />,
        )

        const dateSortButton = screen.getByTestId(
          'violation-card-list-sort-control-date',
        )
        const typeSortButton = screen.getByTestId(
          'violation-card-list-sort-control-kind',
        )
        const boroughSortButton = screen.getByTestId(
          'violation-card-list-sort-control-location',
        )
        const finesSortButton = screen.getByTestId(
          'violation-card-list-sort-control-fined',
        )

        expect(dateSortButton).toBeInTheDocument()
        expect(typeSortButton).toBeInTheDocument()
        expect(boroughSortButton).toBeInTheDocument()
        expect(finesSortButton).toBeInTheDocument()

        if (sortType === Sort.DATE) {
          expect(dateSortButton.classList.contains('active')).toBe(true)
          expect(typeSortButton.classList.contains('active')).toBe(false)
          expect(boroughSortButton.classList.contains('active')).toBe(false)
          expect(finesSortButton.classList.contains('active')).toBe(false)

          const dateSortArrow = dateSortButton.querySelector('svg')

          expect(dateSortArrow).toBeInTheDocument()
          if (sortAscending) {
            expect(dateSortArrow?.classList.contains('fa-angle-up'))
          } else {
            expect(dateSortArrow?.classList.contains('fa-angle-down'))
          }
        } else if (sortType === Sort.KIND) {
          expect(dateSortButton.classList.contains('active')).toBe(false)
          expect(typeSortButton.classList.contains('active')).toBe(true)
          expect(boroughSortButton.classList.contains('active')).toBe(false)
          expect(finesSortButton.classList.contains('active')).toBe(false)

          const typeSortArrow = typeSortButton.querySelector('svg')

          expect(typeSortArrow).toBeInTheDocument()
          if (sortAscending) {
            expect(typeSortArrow?.classList.contains('fa-angle-up'))
          } else {
            expect(typeSortArrow?.classList.contains('fa-angle-down'))
          }
        } else if (sortType === Sort.LOCATION) {
          expect(dateSortButton.classList.contains('active')).toBe(false)
          expect(typeSortButton.classList.contains('active')).toBe(false)
          expect(boroughSortButton.classList.contains('active')).toBe(true)
          expect(finesSortButton.classList.contains('active')).toBe(false)

          const boroughSortArrow = boroughSortButton.querySelector('svg')

          expect(boroughSortArrow).toBeInTheDocument()
          if (sortAscending) {
            expect(boroughSortArrow?.classList.contains('fa-angle-up'))
          } else {
            expect(boroughSortArrow?.classList.contains('fa-angle-down'))
          }
        } else if (sortType === Sort.FINED) {
          expect(dateSortButton.classList.contains('active')).toBe(false)
          expect(typeSortButton.classList.contains('active')).toBe(false)
          expect(boroughSortButton.classList.contains('active')).toBe(false)
          expect(finesSortButton.classList.contains('active')).toBe(true)

          const finesSortArrow = finesSortButton.querySelector('svg')

          expect(finesSortArrow).toBeInTheDocument()
          if (sortAscending) {
            expect(finesSortArrow?.classList.contains('fa-angle-up'))
          } else {
            expect(finesSortArrow?.classList.contains('fa-angle-down'))
          }
        }
      },
    )
  })
})
