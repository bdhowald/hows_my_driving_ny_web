import React, { useState } from 'react'

import Sort from 'constants/sortOptions'
import Violation from 'models/Violation/Violation'
import Vehicle from 'models/Vehicle/Vehicle'
import sortViolations from 'utils/processResults/sortViolations/sortViolations'

import ViolationsTableHeader from './ViolationsTableHeader/ViolationsTableHeader'
import ViolationsTableBody from './ViolationsTableBody/ViolationsTableBody'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResult/ViolationsInspector/ViolationsList/ViolationsList.css'

type OwnProps = {
  showFullFineData: boolean
  showFullText: boolean
  vehicle: Vehicle
}

const ViolationsList = ({
  showFullFineData,
  showFullText,
  vehicle,
}: OwnProps) => {
  const { violations: violationData } = vehicle

  // Set default sort: by date ascending (chronological)
  const [currentSortType, setCurrentSortType] = useState(Sort.DATE)
  const [sortAscending, setSortAscending] = useState(true)

  const sortedViolations: Array<Violation> = sortViolations(
    sortAscending,
    currentSortType,
    violationData.map((dataObj) => new Violation(dataObj)),
  )

  const updateSort = (sortType: Sort): void => {
    if (sortType === currentSortType) {
      // If same sort type, toggle ascending/descending
      setSortAscending(!sortAscending)
    } else {
      // If different type, change sort and reset to ascending.
      setCurrentSortType(sortType)
      setSortAscending(true)
    }
  }

  return (
    <div
      className="table-responsive violations-table-body-wrapper"
      id={`violations-table-${vehicle.uniqueIdentifier}`}
      data-testid="vehicle-violations-list"
    >
      <table className="table table-striped table-sm violations-table">
        <caption>{`${vehicle.violationsCount} parking and camera violations`}</caption>
        <ViolationsTableHeader
          currentSortType={currentSortType}
          sortAscending={sortAscending}
          updateSortFunction={updateSort}
        />
        <ViolationsTableBody
          currentSortType={currentSortType}
          showFullFineData={showFullFineData}
          showFullText={showFullText}
          sortAscending={sortAscending}
          violations={sortedViolations}
        />
      </table>
    </div>
  )
}

ViolationsList.displayName = 'ViolationsList'

export default ViolationsList
