import * as React from 'react'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  BUS_LANE_CAMERA_VIOLATION_CODE,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE,
  RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  RED_LIGHT_CAMERA_VIOLATION_CODE,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION,
  SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE
} from 'constants/violations'
import sorts from 'constants/sortOptions'
import { Violation } from 'models/Violation'
import sortViolations from 'utils/sortViolations'
import { Vehicle } from 'utils/types/responses'


const NUM_COLUMNS = 4

type OwnProps = {
  showFullText: boolean,
  vehicle: Vehicle,
}

export default ({ showFullText, vehicle }: OwnProps) => {

  const { violations: violationData } = vehicle

  const violations = violationData.map((dataObj) => new Violation(dataObj))

  const [currentSortType, setCurrentSortType] = useState(sorts.DATE)
  const [sortAscending, setSortAscending] = useState(true)
  
  const sortedViolations: Array<Violation> = sortViolations(sortAscending, currentSortType, violations)

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
        {sortOptions.map(sortOption => (
          <th key={sortOption.name} className={currentSortType === sortOption.name ? 'sort-column' : ''} onClick={() => applySort(sortOption.name)}>
            {sortOption.displayText}
            {currentSortType === sortOption.name &&
              <FontAwesomeIcon icon={sortAscending ? 'angle-down' : 'angle-up'} />
            }
          </th>
        ))}
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
              <TableRow violation={violation}/>
            </React.Fragment>
          )
        })}
      </tbody>
    )
  }

  const TableRow = ( props: {violation: Violation}): JSX.Element => {
    const { violation } = props
    const totalFined: Number | null = violation.getTotalFined()

    let violationIcon: 'bus' | 'parking' | 'tachometer-alt' | 'traffic-light'

    switch(violation.violationCode) {
      case BUS_LANE_CAMERA_VIOLATION_CODE:
        violationIcon = 'bus'
        break
      case MOBILE_BUS_LANE_CAMERA_VIOLATION_CODE:
        violationIcon = 'bus'
        break
      case RED_LIGHT_CAMERA_VIOLATION_CODE:
        violationIcon = 'traffic-light'
        break
      case SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_CODE:
        violationIcon = 'tachometer-alt'
        break
      default:
        violationIcon = 'parking'
        break
    }

    let tableRowClass: 'table-danger' | 'table-primary' | 'table-warning' | ''

    switch(violation.humanizedDescription) {
      case BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION:
      case MOBILE_BUS_LANE_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION:
        tableRowClass = 'table-primary'
        break
      case RED_LIGHT_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION:
        tableRowClass = 'table-warning'
        break;
      case SCHOOL_ZONE_SPEED_CAMERA_VIOLATION_HUMANIZED_DESCRIPTION:
        tableRowClass = 'table-danger'
        break;
      default:
        tableRowClass = ''
        break;
    }

    return (
      <tr
        className={`violation-row ${tableRowClass}`}
        key={violation.summonsNumber}
      >
        <td>
          {violation.getViolationTime()}
        </td>
        <td className='violation-description'>
          {showFullText ? (
            <div className='humanized-description'>
              {violation.humanizedDescription}
            </div>
          ) : (
            <div className='icons'>
              <FontAwesomeIcon icon={violationIcon}/>
            </div>
          )}
        </td>
        <td className='location'>
          {violation.getBorough() && (
            <span className='borough'>
              {violation.getBorough()}
            </span>
          )}
          {showFullText && (
            <span className='location-description'>
              {violation.getLocationDescription()}
            </span>
          )}
        </td>
        <td>
          {totalFined ? ('$' + totalFined.toFixed(2)) : 'N/A'}
        </td>
      </tr>
    )
  }

  return (
    <div className='table-responsive'>
      <table className='table table-striped table-sm violations-table'>
        <TableHeader />
        <TableBody violations={sortedViolations}/>
      </table>
    </div>
  )
}