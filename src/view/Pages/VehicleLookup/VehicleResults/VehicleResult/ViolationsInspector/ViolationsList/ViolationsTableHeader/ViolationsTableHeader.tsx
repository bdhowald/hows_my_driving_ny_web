import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Sort from 'constants/sortOptions'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsTableHeader/ViolationsTableHeader.css'

type ViolationsTableHeaderProps = {
  currentSortType: Sort
  sortAscending: boolean
  updateSortFunction: (sortType: Sort) => void
}

const SORT_OPTIONS = [
  {
    colSpan: 2,
    displayText: 'Date',
    name: Sort.DATE,
  },
  {
    colSpan: 4,
    displayText: 'Violation',
    name: Sort.KIND,
  },
  {
    colSpan: 4,
    displayText: 'Location',
    name: Sort.LOCATION,
  },
  {
    colSpan: 2,
    displayText: 'Fines',
    name: Sort.FINED,
  },
]

// Add Font Awesome icons
library.add(faAngleDown, faAngleUp)

const ViolationsTableHeader = ({
  currentSortType,
  sortAscending,
  updateSortFunction,
}: ViolationsTableHeaderProps): JSX.Element => {
  return (
    <thead className="thead-light table-light">
      <tr>
        {SORT_OPTIONS.map((sortOption) => {
          const isSortTypeCurrentlySelected =
            currentSortType === sortOption.name
          const sortIcon = sortAscending ? 'angle-up' : 'angle-down'

          return (
            <th
              data-testid={`table-header-${sortOption.name}`}
              aria-sort={
                isSortTypeCurrentlySelected
                  ? sortAscending
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
              key={sortOption.name}
              className={isSortTypeCurrentlySelected ? 'sort-column' : ''}
              onClick={() => updateSortFunction(sortOption.name)}
            >
              <span>{sortOption.displayText}</span>
              {isSortTypeCurrentlySelected && (
                <FontAwesomeIcon
                  icon={sortIcon}
                  title={`${sortIcon.toString()} icon`}
                  titleId={sortIcon.toString()}
                />
              )}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default ViolationsTableHeader
