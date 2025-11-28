import React, { useState } from 'react'

import { USE_NEW_STYLE_DISPLAY_STORAGE_KEY } from 'constants/storage'
import useSettings from 'hooks/useSettings/useSettings'
import {
  FilterFormElement,
  FilterType,
  ResultFilter,
  ResultsFilterSet,
} from 'types/resultsFilters'
import convertCamelCaseToTitleCase from 'utils/displayResults/convertCamelCaseToTitleCase/convertCamelCaseToTitleCase'

import 'view/Pages/VehicleLookup/VehicleResults/FiltersControl/FiltersControl.css'

import FilterBreadcrumb from './FilterBreadcrumb/FilterBreadcrumb'
import FilterMenu from './FilterMenu/FilterMenu'

const FiltersControl = ({
  clearFilterFunction,
  displayingPreviousLookup,
  handleFilterFormSubmitFunction,
  maxViolationsCountForResults,
  resultsFilters,
  resultsLength,
  scrollRef,
}: {
  clearFilterFunction: (fieldName: keyof ResultsFilterSet) => void
  displayingPreviousLookup: boolean
  handleFilterFormSubmitFunction: (
    event: React.FormEvent<FilterFormElement>,
  ) => boolean
  maxViolationsCountForResults: number
  resultsFilters: ResultsFilterSet
  resultsLength: number
  scrollRef: React.RefObject<HTMLDivElement>
}) => {
  const { getSetting } = useSettings()
  const useNewStyleDisplay =
    getSetting(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === true

  const [filtersAreVisble, setFiltersAreVisible] = useState<boolean>(false)

  const activeFilters = getActiveFilters(resultsFilters)

  const displayFilters = () => setFiltersAreVisible(true)
  const hideFilters = () => setFiltersAreVisible(false)

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  return (
    <div
      className={`filters-wrapper ${newStyleDisplayClassName}`}
      data-testid="filters-wrapper-test-id"
      ref={scrollRef}
    >
      <div className="filter-controls">
        <div className="filter-controls-header">
          <ResultsHeaderContent
            displayingPreviousLookup={displayingPreviousLookup}
            resultsLength={resultsLength}
          />
        </div>
        <div className="results-control-toggle">
          <FilterMenuToggle
            setFiltersAreVisibleFunction={setFiltersAreVisible}
            filtersAreVisble={filtersAreVisble}
          />
        </div>
      </div>
      {activeFilters.length > 0 && (
        <div className="active-filters">
          {activeFilters.map((filter: ResultFilter) => (
            <FilterBreadcrumb
              clearFilterFunction={clearFilterFunction}
              displayFiltersMenuFunction={displayFilters}
              filter={filter}
              key={filter.field}
            />
          ))}
        </div>
      )}
      <hr />
      {filtersAreVisble && (
        <FilterMenu
          filtersAreVisible={filtersAreVisble}
          handleFilterFormSubmitFunction={handleFilterFormSubmitFunction}
          hideFiltersFunction={hideFilters}
          maxViolationsCountForResults={maxViolationsCountForResults}
          resultsFilters={resultsFilters}
        />
      )}
    </div>
  )
}

const FilterMenuToggle = ({
  setFiltersAreVisibleFunction,
  filtersAreVisble,
}: {
  filtersAreVisble: boolean
  setFiltersAreVisibleFunction: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const filterToggleText = 'Filter'

  return (
    <button
      className="btn btn-primary"
      onClick={() => setFiltersAreVisibleFunction(!filtersAreVisble)}
      type="button"
    >
      {filterToggleText}
    </button>
  )
}

const ResultsHeaderContent = ({
  displayingPreviousLookup,
  resultsLength,
}: {
  displayingPreviousLookup: boolean
  resultsLength: number
}) => {
  if (!displayingPreviousLookup) {
    const resultsString = resultsLength === 1 ? 'result' : 'results'

    return <div>{`Showing ${resultsLength} ${resultsString}`}</div>
  }

  if (displayingPreviousLookup && resultsLength === 1) {
    // With only one result from a previous link, show one line.
    return <div>Showing 1 result shared via link</div>
  }

  if (displayingPreviousLookup && resultsLength > 1) {
    const fromPreviousLookupHeaderText = '+ 1 shared via link'

    // We need to subtract out the lookup shared via link.
    const resultsString = resultsLength - 1 === 1 ? 'result' : 'results'
    return (
      <>
        <div>{`Showing ${resultsLength - 1} ${resultsString}`}</div>
        {displayingPreviousLookup && <div>{fromPreviousLookupHeaderText}</div>}
      </>
    )
  }
}

const getActiveFilters = (resultFilters: ResultsFilterSet): ResultFilter[] => {
  const activeFilters: ResultFilter[] = []

  if (resultFilters.numberOfViolations) {
    const filterToAdd = {
      args: { key: 'Violations ≥', value: resultFilters.numberOfViolations },
      field: 'numberOfViolations',
      type: FilterType.Threshold,
    } as const
    activeFilters.push(filterToAdd)
  }

  if (resultFilters.plateText) {
    const filterToAdd = {
      args: { key: 'Plate', value: resultFilters.plateText },
      field: 'plateText',
      type: FilterType.Text,
    } as const
    activeFilters.push(filterToAdd)
  }

  if (resultFilters.plateType) {
    const filterToAdd = {
      args: {
        key: 'Type',
        value: convertCamelCaseToTitleCase(resultFilters.plateType),
      },
      field: 'plateType',
      type: FilterType.Text,
    } as const
    activeFilters.push(filterToAdd)
  }

  if (resultFilters.state) {
    const filterToAdd = {
      args: { key: 'State', value: resultFilters.state },
      field: 'state',
      type: FilterType.Text,
    } as const
    activeFilters.push(filterToAdd)
  }

  const endDate = resultFilters.queryDateRange.endDate
  const startDate = resultFilters.queryDateRange.startDate

  if (endDate || startDate) {
    const filterToAdd = {
      args: {
        ...(endDate && { end: endDate }),
        ...(startDate && { start: startDate }),
      },
      field: 'queryDateRange',
      type: FilterType.DateRange,
    } as const

    activeFilters.push(filterToAdd)
  }

  return activeFilters
}

export default FiltersControl
