import React, { useState } from 'react'

import {
  FilterFormElement,
  FilterType,
  ResultFilter,
  ResultsFilterSet,
} from 'types/resultsFilters'

import FilterBreadcrumb from './FilterBreadcrumb/FilterBreadcrumb'
import FilterMenu from './FilterMenu/FilterMenu'

const FiltersControl = ({
  clearFilterFunction,
  handleFilterFormSubmitFunction,
  maxViolationsCountForResults,
  resultsFilters,
  resultsLength,
  scrollRef,
}: {
  clearFilterFunction: (fieldName: keyof ResultsFilterSet) => void
  handleFilterFormSubmitFunction: (
    event: React.FormEvent<FilterFormElement>,
  ) => boolean
  maxViolationsCountForResults: number
  resultsFilters: ResultsFilterSet
  resultsLength: number
  scrollRef: React.RefObject<HTMLDivElement>
}) => {
  const [filtersAreVisble, setFiltersAreVisible] = useState<boolean>(false)

  const activeFilters = getActiveFilters(resultsFilters)

  const resultsString = resultsLength === 1 ? 'result' : 'results'

  const displayFilters = () => setFiltersAreVisible(true)
  const hideFilters = () => setFiltersAreVisible(false)

  return (
    <div
      className="filters-wrapper"
      data-testid="filters-wrapper-test-id"
      ref={scrollRef}
    >
      <div className="filter-controls">
        <div className="filter-controls-header">
          {`Showing ${resultsLength} ${resultsString}`}
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
      args: { key: 'Type', value: capitalize(resultFilters.plateType) },
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

const capitalize = (original: string) => {
  if (typeof original !== 'string' || original.length === 0) {
    return original
  }
  return original.charAt(0).toUpperCase() + original.slice(1)
}

export default FiltersControl
