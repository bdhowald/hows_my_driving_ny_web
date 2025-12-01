import React, { useContext, useRef, useState } from 'react'

import { USER_SETTINGS_STORAGE_KEYS } from 'constants/userSettings'
import { ApplicationContext } from 'context/ApplicationContext/ApplicationContext'
import useSearchFiltersActiveCookie from 'hooks/useSearchFiltersActiveCookie/useSearchFiltersActiveCookie'
import useSettings from 'hooks/useSettings/useSettings'
import Vehicle from 'models/Vehicle/Vehicle'
import {
  VehicleDisplayResult,
  VehicleDisplaySuccessResult,
} from 'types/vehicleDisplayResult'
import filterResultsWithUserFilters from 'utils/filterResults/filterResultsWithUserFilters/filterResultsWithUserFilters'
import isCompleteVehicleResult from 'utils/types/isCompleteVehicleResult/isCompleteVehicleResult'
import { FilterFormElement, ResultsFilterSet } from 'types/resultsFilters'
import AnalyticsTracker from 'utils/analytics/tracking'

import 'view/Pages/VehicleLookup/VehicleResults/VehicleResults.css'

import FiltersControl from './FiltersControl/FiltersControl'
import VehicleResult from './VehicleResult/VehicleResult'

const getKey = (vehicle: Vehicle): string =>
  `${vehicle.state}:${vehicle.plate}:${vehicle.plateTypes}`

type RefreshLookupFunctionType = (vehicle: Vehicle) => Promise<void>
type RemoveLookupFunctionType = (arg0: number) => void

type CombinedVehicleResultsProps = {
  vehicleDisplayResults: VehicleDisplayResult[]
  refreshLookupFunction: RefreshLookupFunctionType
  removeLookupFunction: RemoveLookupFunctionType
}

const CombinedVehicleResults = ({
  refreshLookupFunction,
  removeLookupFunction,
  vehicleDisplayResults,
}: CombinedVehicleResultsProps) => {
  vehicleDisplayResults.sort(
    (a: VehicleDisplayResult, b: VehicleDisplayResult) => {
      const aHasPriority =
        a.expandResults || a.fromPreviousLookupUniqueIdentifier
      const bHasPriority =
        b.expandResults || b.fromPreviousLookupUniqueIdentifier

      if (aHasPriority && !bHasPriority) {
        return -1
      }
      return 0
    },
  )

  const displayableVehicleDisplayResults = vehicleDisplayResults.filter(
    (r) => r.isSuccessfulLookup && isCompleteVehicleResult(r.vehicle),
  ) as VehicleDisplaySuccessResult[]

  return (
    <>
      {displayableVehicleDisplayResults.map(
        (vehicleDisplayResult: VehicleDisplaySuccessResult, index: number) => {
          const showViolationsList = vehicleDisplayResult.expandResults

          return (
            <VehicleResult
              key={getKey(vehicleDisplayResult.vehicle)}
              index={index}
              refreshLookupFunction={refreshLookupFunction}
              removeLookupFunction={removeLookupFunction}
              showViolationsList={showViolationsList}
              vehicleDisplayResult={vehicleDisplayResult}
            />
          )
        },
      )}
    </>
  )
}

const vehicleResultsAreEqual = (
  prevProps: CombinedVehicleResultsProps,
  nextProps: CombinedVehicleResultsProps,
) => {
  const prevUniqueIdentifiers = prevProps.vehicleDisplayResults
    .map(
      (vehicleDisplayResult) => vehicleDisplayResult.vehicle.uniqueIdentifier,
    )
    .join()

  const nextUniqueIdentifiers = nextProps.vehicleDisplayResults
    .map(
      (vehicleDisplayResult) => vehicleDisplayResult.vehicle.uniqueIdentifier,
    )
    .join()

  return prevUniqueIdentifiers === nextUniqueIdentifiers
}

const MemoizedCombinedVehicleResults = React.memo(
  CombinedVehicleResults,
  vehicleResultsAreEqual,
)

const ShimmerLoader = ({
  useNewStyleDisplay,
}: {
  useNewStyleDisplay: boolean
}) => {
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  const ShimmerColumn = ({
    textAlignDirection,
    position,
  }: {
    textAlignDirection: 'left' | 'right'
    position: 'left' | 'right'
  }) => {
    const positionLeftColumnWidths = [10, 8, 9, 10, 9]
    const positionRightColumnWidths = [9, 8, 6, 10, 8]
    const listToUse =
      position === 'left' ? positionLeftColumnWidths : positionRightColumnWidths

    const classNameString = `summary-box shimmer align-${textAlignDirection} position-${position} lookup-info ${newStyleDisplayClassName}`

    return (
      <div className={classNameString}>
        {listToUse.map((columnWidth: number, i: number) => {
          return <span key={i} className={`placeholder col-${columnWidth}`} />
        })}
      </div>
    )
  }

  return (
    <div
      className="vehicle card"
      aria-hidden="true"
      data-testid="shimmer-loader"
    >
      <div className="card-header shimmer" />
      <ul className="list-group-flush list-group">
        <li className="no-padding list-group-item card-title placeholder-glow">
          <div className={`row ${newStyleDisplayClassName}`}>
            <div
              className={`summary-section col-xs-12 col-sm-6 ${newStyleDisplayClassName}`}
            >
              <ShimmerColumn textAlignDirection="left" position="left" />
              <ShimmerColumn textAlignDirection="right" position="left" />
            </div>
            <div
              className={`summary-section col-xs-12 col-sm-6 ${newStyleDisplayClassName}`}
            >
              <ShimmerColumn textAlignDirection="left" position="right" />
              <ShimmerColumn textAlignDirection="right" position="right" />
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="violations-table-wrapper">
            <div className="violations-table-header">
              <div className="row">
                <div className="col-12">
                  <a
                    className="btn btn-primary disabled placeholder col-12"
                    aria-disabled="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

const VehicleResults = ({
  existingQueriesInFlight,
  lookupInFlight,
  refreshLookupFunction,
  removeLookupFunction,
  scrollRef,
  vehicleDisplayResults,
}: {
  existingQueriesInFlight: boolean
  lookupInFlight: boolean
  refreshLookupFunction: RefreshLookupFunctionType
  removeLookupFunction: RemoveLookupFunctionType
  scrollRef: React.RefObject<HTMLDivElement>
  vehicleDisplayResults: VehicleDisplayResult[]
}) => {
  const filterControlsRef = useRef<HTMLDivElement>(null)

  const [resultsFilters, setResultsFilters] = useState<ResultsFilterSet>({
    numberOfViolations: undefined,
    plateText: undefined,
    plateType: undefined,
    queryDateRange: {
      endDate: undefined,
      startDate: undefined,
    },
    state: undefined,
  })

  const { getSetting } = useSettings()
  const { areSearchFiltersActive } = useSearchFiltersActiveCookie()
  const useSearchFilters = areSearchFiltersActive()

  const applicationContext = useContext(ApplicationContext)
  const { tracker } = applicationContext

  const useNewStyleDisplay =
    getSetting(USER_SETTINGS_STORAGE_KEYS.useNewStyleDisplay) === true
  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  const showResultsHeaderAndFiltersControl =
    useSearchFilters && vehicleDisplayResults.length > 0

  const maxViolationsCountForResults = Math.max(
    ...vehicleDisplayResults.map((result) => {
      if (!isCompleteVehicleResult(result.vehicle)) {
        return 0
      }
      return result.vehicle?.violationsCount
    }),
  )

  const filteredVehicleDisplayResults = filterResultsWithUserFilters(
    vehicleDisplayResults,
    resultsFilters,
  )

  const displayingPreviousLookup = vehicleDisplayResults.some(
    (vehicleDisplayResult) =>
      vehicleDisplayResult.fromPreviousLookupUniqueIdentifier,
  )

  const clearFilterWrapper = (fieldName: keyof ResultsFilterSet) =>
    clearFilter(fieldName, setResultsFilters, tracker, useNewStyleDisplay)

  const handleFilterFormSubmitWrapper = (
    event: React.FormEvent<FilterFormElement>,
  ) =>
    handleFilterFormSubmit(
      event,
      setResultsFilters,
      filterControlsRef,
      tracker,
      useNewStyleDisplay,
    )

  return (
    <>
      {showResultsHeaderAndFiltersControl && (
        <FiltersControl
          clearFilterFunction={clearFilterWrapper}
          displayingPreviousLookup={displayingPreviousLookup}
          handleFilterFormSubmitFunction={handleFilterFormSubmitWrapper}
          maxViolationsCountForResults={maxViolationsCountForResults}
          resultsFilters={resultsFilters}
          resultsLength={filteredVehicleDisplayResults.length}
          scrollRef={filterControlsRef}
        />
      )}
      <div
        className={`vehicles ${newStyleDisplayClassName}`}
        ref={lookupInFlight ? null : scrollRef}
      >
        {lookupInFlight && (
          // Display loader above results when a current lookup is in flight,
          // regardless of whether existing results are still being queried.
          <ShimmerLoader useNewStyleDisplay={useNewStyleDisplay} />
        )}
        <MemoizedCombinedVehicleResults
          refreshLookupFunction={refreshLookupFunction}
          removeLookupFunction={removeLookupFunction}
          vehicleDisplayResults={filteredVehicleDisplayResults}
        />
        {existingQueriesInFlight && !lookupInFlight && (
          // Display loader below results when a current lookup is not in flight,
          // but existing queries in flight are (show below any new lookup we have).
          <ShimmerLoader useNewStyleDisplay={useNewStyleDisplay} />
        )}
      </div>
    </>
  )
}

const clearFilter = (
  fieldName: keyof ResultsFilterSet,
  setResultsFilters: (value: React.SetStateAction<ResultsFilterSet>) => void,
  tracker: AnalyticsTracker | undefined,
  useNewStyleDisplay: boolean,
) => {
  setResultsFilters((previousFilterState) => {
    const resetState =
      fieldName === 'queryDateRange'
        ? {
            endDate: undefined,
            startDate: undefined,
          }
        : undefined

    const newFilterState = {
      ...previousFilterState,
      ...{
        [fieldName]: resetState,
      },
    }

    tracker?.trackEvent('user_set_filter', {
      filters: newFilterState,
      useNewStyleDisplay,
      useSearchFilters: true,
    })

    return newFilterState
  })
}

const handleFilterFormSubmit = (
  event: React.FormEvent<FilterFormElement>,
  setResultsFilters: (value: React.SetStateAction<ResultsFilterSet>) => void,
  scrollRef: React.RefObject<HTMLDivElement>,
  tracker: AnalyticsTracker | undefined,
  useNewStyleDisplay: boolean,
) => {
  event.preventDefault()

  const form = event.currentTarget

  const formElements = form.elements

  const endDateElement = formElements['filter-results-end-date']
  const endDateValue = endDateElement.value

  const numberOfViolationsFilterEnabled =
    formElements['filter-results-number-violations-control'].checked
  const numberOfViolationsValue = numberOfViolationsFilterEnabled
    ? formElements['filter-results-number-violations'].value
    : undefined

  const plateText = formElements['filter-results-plate-text'].value
  const plateType = formElements['filter-results-plate-type'].value
  const startDateValue = formElements['filter-results-start-date'].value
  const stateValue = formElements['filter-results-state'].value

  const endDate = endDateValue
    ? new Date(`${endDateValue} 23:59:59`)
    : undefined
  const startDate = startDateValue
    ? new Date(`${startDateValue} 00:00:00`)
    : undefined

  const numberOfViolationsAsInteger = Number(numberOfViolationsValue)

  // Reset form validity
  endDateElement.setCustomValidity('')

  if (endDate && startDate && startDate > endDate) {
    endDateElement.setCustomValidity('End date must be on or after start date.')
    endDateElement.reportValidity()
    return false
  }

  const newFilterState = {
    numberOfViolations: Number.isNaN(numberOfViolationsAsInteger)
      ? undefined
      : numberOfViolationsAsInteger,
    plateType,
    plateText: plateText ? plateText.toUpperCase() : undefined,
    queryDateRange: {
      endDate,
      startDate,
    },
    state: stateValue ? stateValue : undefined,
  }

  setResultsFilters(newFilterState)

  tracker?.trackEvent('user_set_filter', {
    filters: newFilterState,
    useNewStyleDisplay,
    useSearchFilters: true,
  })

  if (scrollRef && scrollRef.current) {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return true
}

VehicleResults.displayName = 'VehicleResults'

export default React.memo(VehicleResults)
