import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Sort from 'constants/sortOptions'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationCardList/ViolationCardListSortControls/ViolationCardListSortControls.css'

const SORT_OPTIONS: SortOption[] = [
  {
    displayText: 'Date',
    name: Sort.DATE,
  },
  {
    displayText: 'Type',
    name: Sort.KIND,
  },
  {
    displayText: 'Borough',
    name: Sort.LOCATION,
  },
  {
    displayText: 'Fines',
    name: Sort.FINED,
  },
]

type SortOption = {
  displayText: 'Date' | 'Fines' | 'Borough' | 'Type'
  name: Sort
}

type ViolationCardListSortControlProps = {
  currentSortType: Sort
  sortAscending: boolean
  updateSortFunction: (sortType: Sort) => void
}

// Add Font Awesome icons
library.add(faAngleDown, faAngleUp)

const ViolationCardListSortControl = ({
  isCurrentSort,
  sortAscending,
  sortOption,
  updateSortFunction,
}: {
  isCurrentSort: boolean
  sortAscending: boolean
  sortOption: SortOption
  updateSortFunction: (sortType: Sort) => void
}) => {
  const sortIcon = sortAscending ? 'angle-up' : 'angle-down'
  const isActiveClassName = isCurrentSort ? 'active' : ''

  const classNameString = `violation-card-list-sort-control ${sortOption.name} ${isActiveClassName}`

  return (
    <div
      className={classNameString}
      data-testid={`violation-card-list-sort-control-${sortOption.name}`}
      onClick={() => updateSortFunction(sortOption.name)}
    >
      <span className="violation-card-list-sort-control-name">
        {sortOption.displayText}
      </span>
      {isCurrentSort ? (
        <FontAwesomeIcon
          icon={sortIcon}
          title={`${sortIcon.toString()} icon`}
          titleId={sortIcon.toString()}
        />
      ) : (
        <span className="arrow-placeholder"></span>
      )}
    </div>
  )
}

const ViolationCardListSortControls = ({
  currentSortType,
  sortAscending,
  updateSortFunction,
}: ViolationCardListSortControlProps) => {
  return (
    <div className="violation-card-list-sort-controls">
      {SORT_OPTIONS.map((sortOption, index) => {
        const isSortTypeCurrentlySelected = currentSortType === sortOption.name

        return (
          <ViolationCardListSortControl
            isCurrentSort={isSortTypeCurrentlySelected}
            key={index}
            sortAscending={sortAscending}
            sortOption={sortOption}
            updateSortFunction={updateSortFunction}
          />
        )
      })}
    </div>
  )
}

ViolationCardListSortControls.displayName = 'ViolationCardListSortControls'

export default ViolationCardListSortControls
