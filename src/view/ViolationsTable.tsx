import * as React from 'react'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import sorts from 'constants/sortOptions'
import { Violation } from 'models/Violation'
import sortViolations from 'utils/sortViolations'
import { Vehicle } from 'utils/types/responses'
import TableRow from 'view/ViolationsTableRow'


const NUM_COLUMNS = 4

type OwnProps = {
  showFullText: boolean,
  vehicle: Vehicle,
}

const ViolationsTable = ({ showFullText, vehicle }: OwnProps) => {

  const { violations: violationData } = vehicle

  const violations = violationData.map((dataObj) => new Violation(dataObj))

  const [currentSortType, setCurrentSortType] = useState(sorts.DATE)
  const [sortAscending, setSortAscending] = useState(true)
  
  const sortedViolations: Array<Violation> = sortViolations(
    sortAscending,
    currentSortType,
    violations
  )

  const sortOptions = [
    {
      colSpan: 2,
      displayText: 'Date',
      name: sorts.DATE,
    }, {
      colSpan: 4,
      displayText: 'Violation',
      name: sorts.KIND,
    }, {
      colSpan: 4,
      displayText: 'Location',
      name: sorts.LOCATION,
    }, {
      colSpan: 2,
      displayText: 'Fines',
      name: sorts.FINED,
    }
  ]

  const applySort = (sortType: sorts): void => {
    if (sortType === currentSortType) {
      setSortAscending(!sortAscending)
    } else {
      setCurrentSortType(sortType)
      setSortAscending(false)
    }
  }

  const TableHeader = (): JSX.Element => (
    <thead className='thead-light'>
      <tr>
        {sortOptions.map(sortOption => {
          const isSortTypeCurrentlySelected = currentSortType === sortOption.name
          return (
            <th
              aria-sort={
                isSortTypeCurrentlySelected
                  ? (sortAscending ? 'ascending' : 'descending')
                  : 'none'
              }
              key={sortOption.name}
              className={isSortTypeCurrentlySelected ? 'sort-column' : ''}
              onClick={() => applySort(sortOption.name)}
            >
              {sortOption.displayText}
              {isSortTypeCurrentlySelected &&
                <FontAwesomeIcon icon={sortAscending ? 'angle-down' : 'angle-up'} />
              }
            </th>
          )
        })}
      </tr>
    </thead>
  )

  type TableBodyProps = {
    violations: Array<Violation>
  }

  const TableBody = ( props: TableBodyProps ): JSX.Element => {

    const SortDivider = (
      { columnIndex, dividerText }: { columnIndex: number, dividerText: number | string }
    ) => (
      <tr className='sort-divider'>
        {/* Filler columns before divider cell */}
        {[...Array(columnIndex)].map((_, i) => <th key={i} colSpan={1} />)}

        {/* // Divider cell */}
        <th colSpan={1}>
          {dividerText}
        </th>

        {/* // Filler columns after divider cell */}
        {[...Array(NUM_COLUMNS - columnIndex - 1)].map((_, i) => <th key={i} colSpan={1} />)}
      </tr>
    )

    const getDividerIfNeeded = (
      currentLexicographicOrder: { value: string | number | null },
      violation: Violation,
    ) => {
      let dividerValue = null
      let columnIndex = null

      switch (currentSortType) {
        case sorts.DATE:
          columnIndex = 0
          dividerValue = new Date(violation.formattedTime).getFullYear()
          break
        case sorts.LOCATION:
          columnIndex = 2
          dividerValue = violation.getBorough()
          break
      }

      // If this sort doesn't have dividers, ignore.
      if (columnIndex === null || !dividerValue) {
        return null
      }

      const needsDivider = !currentLexicographicOrder.value
        || ((sortAscending && dividerValue > currentLexicographicOrder.value)
        || (!sortAscending && dividerValue < currentLexicographicOrder.value))

      if (needsDivider) {
        currentLexicographicOrder.value = dividerValue
        return <SortDivider columnIndex={columnIndex} dividerText={dividerValue} />
      }
      return null
    }

    const dividerCounter: { value: string | number | null } = { value: null }

    return (
      <tbody>
        {props.violations.map((violation: Violation) => {
          return (
            <React.Fragment key={violation.summonsNumber}>
              {getDividerIfNeeded(dividerCounter, violation)}
              <TableRow showFullText={showFullText} violation={violation}/>
            </React.Fragment>
          )
        })}
      </tbody>
    )
  }

  return (
    <div className='table-responsive'>
      <table className='table table-striped table-sm violations-table'>
        <caption>{'Parking and camera violations'}</caption>
        <TableHeader />
        <TableBody violations={sortedViolations}/>
      </table>
    </div>
  )
}

ViolationsTable.displayname = 'ViolationsTable'

export default ViolationsTable