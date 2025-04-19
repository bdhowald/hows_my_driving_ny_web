import React, { useMemo, useState } from 'react'

import Sort from 'constants/sortOptions'
import Vehicle from 'models/Vehicle/Vehicle'
import Violation from 'models/Violation/Violation'
import sortViolations from 'utils/processResults/sortViolations/sortViolations'

import ViolationCardGroup from './ViolationCardGroup/ViolationCardGroup'
import ViolationCardListControls from './ViolationCardListControls/ViolationCardListControls'
import ViolationCardListSortControls from './ViolationCardListSortControls/ViolationCardListSortControls'
import ViolationDetail from './ViolationDetail/ViolationDetail'

const FINE_DIVIDER_INCREMENT = 25

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

  const getDividerValueForSort = (
    violation: Violation,
    currentSortType: Sort,
  ) => {
    switch (currentSortType) {
      case Sort.DATE:
        return new Date(violation.formattedTime).getFullYear().toString()
      case Sort.KIND:
        return violation.humanizedDescription ?? 'No Description Available'
      case Sort.LOCATION: {
        const borough = violation.getBorough()

        if (borough === 'The Bronx') {
          // Temporary fix for discrepancy between Bronx/The Bronx
          return 'Bronx'
        } else {
          return borough
        }
      }
      case Sort.FINED: {
        return getFinesSortDivider(violation.getTotalFined())
      }
      default: {
        throw Error('Unknown sort type')
      }
    }
  }

  const getFinesSortDivider = (totalFined: number | null): number => {
    if (totalFined === null) {
      return -1
    }
    const rounded = Math.round(totalFined)
    return Math.floor(rounded / FINE_DIVIDER_INCREMENT) * FINE_DIVIDER_INCREMENT
  }

  const caption =
    vehicle.violationsCount > 1
      ? `${vehicle.violationsCount} parking and camera violations`
      : `${vehicle.violationsCount} parking and camera violation`

  const partitionViolationsBySortGroup = (
    violations: Violation[],
    currentSortType: Sort,
  ) => {
    const buckets: Map<string | number, Violation[]> = new Map()

    violations.map((violation) => {
      const dividerValue = getDividerValueForSort(violation, currentSortType)
      if (buckets.has(dividerValue)) {
        const currentValueForBucket = buckets.get(dividerValue) as Violation[]
        buckets.set(dividerValue, currentValueForBucket.concat([violation]))
      } else {
        buckets.set(dividerValue, [violation])
      }
    })

    return buckets
  }

  const partitionedViolations = partitionViolationsBySortGroup(
    sortedViolations,
    currentSortType,
  )

  const memoizedViolationCardGroups = useMemo(
    () =>
      [...partitionedViolations.keys()].map((bucketName: string | number) => {
        const bucket = partitionedViolations.get(bucketName) as Violation[]
        const vehicleKey = `${vehicle.state}:${vehicle.plate}:${vehicle.plateTypes ? vehicle.plateTypes : ''}`
        const versionedIndex = `${vehicleKey}-${bucketName}-${currentSortType}-${sortAscending}`
        return (
          <ViolationCardGroup
            bucket={bucket as Violation[]}
            bucketName={bucketName}
            currentSortType={currentSortType}
            index={versionedIndex}
            key={versionedIndex}
            showOffCanvasFunction={showOffCanvas}
            sortAscending={sortAscending}
          />
        )
      }),
    [currentSortType, sortAscending],
  )

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
          <div
            className="violation-card-list bg-body"
            data-testid="violation-card-list"
          >
            {memoizedViolationCardGroups}
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
