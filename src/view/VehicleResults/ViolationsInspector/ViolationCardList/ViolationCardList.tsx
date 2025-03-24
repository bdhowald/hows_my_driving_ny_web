import React, { useState } from 'react'

import Sort from 'constants/sortOptions'
import Vehicle from 'models/Vehicle/Vehicle'
import Violation from 'models/Violation/Violation'
import sortViolations from 'utils/processResults/sortViolations/sortViolations'

import ViolationCard from './ViolationCard/ViolationCard'
import ViolationCardListControls from './ViolationCardListControls/ViolationCardListControls'
import ViolationCardListSortControls from './ViolationCardListSortControls/ViolationCardListSortControls'
import ViolationDetail from './ViolationDetail/ViolationDetail'

const ViolationCardList = ({
  setViolationsListVisibilityFunction,
  vehicle,
  violationsListIsVisible,
}: {
  setViolationsListVisibilityFunction: (arg1: boolean) => void
  vehicle: Vehicle
  violationsListIsVisible: boolean
}) => {
  const { violations: violationData } = vehicle

  // Set default sort: by date ascending (chronological)
  const [currentSortType, setCurrentSortType] = useState(Sort.DATE)
  const [sortAscending, setSortAscending] = useState(false)

  const violationsCount = vehicle.violationsCount
  console.log(`vehicle.violationsCount: ${vehicle.violationsCount}`)
  const vehicleHasViolations = violationsCount > 0

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

  const [showViolationDetail, setshowViolationDetail] = useState(false)
  const [violationToInspect, setViolationToInspect] =
    useState<Violation | null>(null)

  const hideOffCanvas = () => setshowViolationDetail(false)
  const showOffCanvas = (violation: Violation) => {
    setViolationToInspect(violation)
    setshowViolationDetail(true)
  }

  const sortedViolations: Array<Violation> = sortViolations(
    sortAscending,
    currentSortType,
    violationData.map((dataObj) => new Violation(dataObj)),
  )

  const SortDivider = ({ dividerText }: { dividerText: string }) => {
    const dividerTextTestIdPart = dividerText
      .toString()
      .toLowerCase()
      .replace(' ', '-')

    return (
      <div
        className="violation-card-sort-divider bg-dark"
        data-testid={`sort-divider-${currentSortType}-${sortAscending ? 'ascending' : 'descending'}-${dividerTextTestIdPart}`}
      >
        {/* // Divider cell */}
        <span>{dividerText}</span>
      </div>
    )
  }

  const getDividerIfNeeded = (
    currentLexicographicOrder: { value: string | number | null },
    violation: Violation,
  ) => {
    /**
     * returns sort dividers if the sort type and violation ordering call for it
     *
     * note: function expects violations to be sorted according to the sort type
     */
    let dividerValue: null | string = null

    switch (currentSortType) {
      case Sort.DATE:
        dividerValue = new Date(violation.formattedTime)
          .getFullYear()
          .toString()
        break
      case Sort.KIND:
        dividerValue = violation.humanizedDescription
        break
      case Sort.LOCATION: {
        const borough = violation.getBorough()

        if (borough === 'The Bronx') {
          // Temporary fix for discrepancy between Bronx/The Bronx
          dividerValue = 'Bronx'
        } else {
          dividerValue = borough
        }
        break
      }
    }

    // If this sort doesn't have dividers, ignore.
    if (!dividerValue) {
      return null
    }

    const needsDivider =
      !currentLexicographicOrder.value ||
      (sortAscending && dividerValue > currentLexicographicOrder.value) ||
      (!sortAscending && dividerValue < currentLexicographicOrder.value)

    if (needsDivider) {
      currentLexicographicOrder.value = dividerValue
      return <SortDivider dividerText={dividerValue} />
    }
    return null
  }

  const dividerCounter: { value: string | number | null } = { value: null }
  const caption =
    vehicle.violationsCount > 1
      ? `${vehicle.violationsCount} parking and camera violations`
      : `${vehicle.violationsCount} parking and camera violation`

  console.log(`vehicleHasViolations: ${vehicleHasViolations}`)
  console.log(`violationsListIsVisible: ${violationsListIsVisible}`)

  return (
    <>
      <ViolationCardListControls
        setViolationsListVisibilityFunction={
          setViolationsListVisibilityFunction
        }
        vehicle={vehicle}
        violationsListIsVisible={violationsListIsVisible}
      />
      {vehicleHasViolations && violationsListIsVisible && (
        <>
          <div className="violation-card-list-caption">{caption}</div>
          <ViolationCardListSortControls
            currentSortType={currentSortType}
            sortAscending={sortAscending}
            updateSortFunction={updateSort}
          />
          <div className="violation-card-list bg-body">
            {sortedViolations.map((violation: Violation, index: number) => (
              <React.Fragment key={index}>
                {getDividerIfNeeded(dividerCounter, violation)}
                <ViolationCard
                  index={index}
                  inspectViolationFunction={showOffCanvas}
                  violation={violation}
                />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
      <ViolationDetail
        hideOffCanvas={hideOffCanvas}
        showViolationDetail={showViolationDetail}
        violationToInspect={violationToInspect}
      />
    </>
  )
}

export default ViolationCardList
