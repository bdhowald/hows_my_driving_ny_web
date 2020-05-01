import * as React from 'react'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import sorts from 'constants/sortOptions'
import sortViolations from 'utils/sortViolations'
import { Vehicle, Violation } from 'utils/types/responses'


type OwnProps = {
  vehicle: Vehicle,
}

const LOCALE_ARGS = {year: 'numeric', month: '2-digit', day: '2-digit'}

export default ({ vehicle }: OwnProps) => {

  const { violations } = vehicle

  const [currentSortType, setCurrentSortType] = useState(sorts.DATE)
  const [sortAscending, setSortAscending] = useState(true)
  
  const sortedViolations: Array<Violation> = sortViolations(sortAscending, currentSortType, violations)

  const sortOptions = [
    {
      displayText: 'Date',
      name: sorts.DATE,
    }, {
      displayText: 'Violation',
      name: sorts.KIND,
    }, {
      displayText: 'Location',
      name: sorts.LOCATION,
    }, {
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

  const TableBody = ( props: TableBodyProps ): JSX.Element => (
    <tbody>
      {props.violations.map((violation: Violation) => (
        <TableRow key={violation.summonsNumber} violation={violation}/>
      ))}
    </tbody>
  )

  const TableRow = ( props: {violation: Violation}): JSX.Element => {
    const { violation } = props
    const violationTime = Date.parse(violation.formattedTime)
      ? new Date(violation.formattedTime).toLocaleDateString('en-US', LOCALE_ARGS)
      : 'N/A'

    return (
      <tr key={violation.summonsNumber} className={violation.humanizedDescription === 'School Zone Speed Camera Violation' ? 'violation-row table-warning' : (violation.humanizedDescription === 'Failure to Stop at Red Light' ? 'violation-row table-danger' : 'violation-row')}>
        <td>
          {violationTime}
        </td>
        <td>
          {violation.humanizedDescription}
        </td>
        <td>
          {violation.violationCounty} {violation.location == null ? '' : ('(' + violation.location + ')')}
        </td>
        <td>
          {violation.fineAmount ? (violation.reductionAmount ? ('$' + (violation.fineAmount - violation.reductionAmount)) : ('$' + violation.fineAmount)) : 'N/A'}
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
