import React, { useRef } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'

import { SMALL_BREAKPOINT } from 'constants/breakpoints'
import { MIN_LOOKUP_DATE_FOR_HOWS_MY_DRIVING_NY_LOOKUPS } from 'constants/dates'
import plateTypes from 'constants/plateTypes'
import regions from 'constants/regions'
import { FilterFormElement, ResultsFilterSet } from 'types/resultsFilters'
import formatDateInEasternTime from 'utils/filterResults/formatDateInEasternTime/formatDateInEasternTime'

import 'view/Pages/VehicleLookup/VehicleResults/FiltersControl/FilterMenu/FilterMenu.css'

import FormControls from './FormControls/FormControls'

const FilterMenu = ({
  filtersAreVisible,
  handleFilterFormSubmitFunction,
  hideFiltersFunction,
  maxViolationsCountForResults,
  resultsFilters,
}: {
  filtersAreVisible: boolean
  handleFilterFormSubmitFunction: (
    event: React.FormEvent<FilterFormElement>,
  ) => boolean
  hideFiltersFunction: () => void
  maxViolationsCountForResults: number
  resultsFilters: ResultsFilterSet
}) => {
  const pageWidth = window.innerWidth
  const offCanvasPlacement = pageWidth >= SMALL_BREAKPOINT ? 'start' : 'bottom'

  const todayAsIsoString = new Date().toISOString().split('T')[0]

  const endDate = resultsFilters.queryDateRange.endDate
  const startDate = resultsFilters.queryDateRange.startDate

  const endDateAsIsoString = endDate
    ? formatDateInEasternTime.endOfDay(endDate).toISOString().split('T')[0]
    : undefined
  const startDateAsIsoString = startDate
    ? startDate.toISOString().split('T')[0]
    : undefined

  const endDateRef = useRef<HTMLInputElement>(null)
  const startDateRef = useRef<HTMLInputElement>(null)

  return (
    <Offcanvas
      aria-label="Filter menu"
      show={filtersAreVisible}
      placement={offCanvasPlacement}
      onHide={hideFiltersFunction}
    >
      <Offcanvas.Header closeButton closeLabel="close filter menu">
        <Offcanvas.Title>Filter results by...</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="filter-controls-menu">
          <div className="filter-controls-menu-controls m-0 border-0">
            <form
              aria-label="Filter form"
              className="form"
              onSubmit={(event: React.FormEvent<FilterFormElement>) => {
                const isSubmitSuccessful = handleFilterFormSubmitFunction(event)
                if (isSubmitSuccessful) {
                  hideFiltersFunction()
                }
              }}
            >
              <div>
                <div className="input-group mb-2">
                  <span
                    className="input-group-text plate-label"
                    id="filter-results-plate-text-label"
                  >
                    Plate
                  </span>
                  <FormControls.InputWithClearButton
                    aria-labelledby="filter-results-plate-text-label"
                    className="form-control"
                    defaultValue={resultsFilters.plateText}
                    id="filter-results-plate-text"
                    innerLabel="Plate filter"
                    placeholder="Whole or partial"
                    type="text"
                  />
                </div>
                <div className="input-group mb-2">
                  <label
                    className="input-group-text plate-label"
                    id="filter-results-state-label"
                  >
                    Region
                  </label>
                  <FormControls.SelectWithClearButton
                    aria-labelledby="filter-results-state-label"
                    className="form-control form-select"
                    defaultValue={resultsFilters.state}
                    id="filter-results-state"
                    innerLabel="Region"
                  >
                    <RegionFilterOptions />
                  </FormControls.SelectWithClearButton>
                </div>
                <div className="input-group mb-2">
                  <label
                    className="input-group-text plate-label"
                    id="filter-results-plate-type-label"
                  >
                    Type
                  </label>
                  <FormControls.SelectWithClearButton
                    aria-labelledby="filter-results-plate-type-label"
                    className="form-control form-select"
                    defaultValue={resultsFilters.plateType}
                    id="filter-results-plate-type"
                    innerLabel="Type"
                  >
                    <PlateTypeFilterOptions />
                  </FormControls.SelectWithClearButton>
                </div>
              </div>
              <hr />
              <div>
                <div className="input-group mb-2">
                  <span
                    className="input-group-text date-label"
                    id="filter-results-start-date-label"
                  >
                    Searched from
                  </span>
                  <FormControls.InputWithClearButton
                    aria-labelledby="filter-results-start-date-label"
                    className="form-control"
                    defaultValue={startDateAsIsoString}
                    id="filter-results-start-date"
                    innerLabel="Searched from filter"
                    innerRef={startDateRef}
                    max={todayAsIsoString}
                    min={MIN_LOOKUP_DATE_FOR_HOWS_MY_DRIVING_NY_LOOKUPS}
                    onChange={() => {
                      if (startDateRef.current && endDateRef.current) {
                        endDateRef.current.min = startDateRef.current.value
                      }
                    }}
                    type="date"
                  />
                </div>
                <div className="input-group mb-2">
                  <span
                    className="input-group-text date-label"
                    id="filter-results-end-date-label"
                  >
                    Searched to
                  </span>
                  <FormControls.InputWithClearButton
                    aria-labelledby="filter-results-end-date-label"
                    className="form-control"
                    defaultValue={endDateAsIsoString}
                    id="filter-results-end-date"
                    innerLabel="Searched to filter"
                    innerRef={endDateRef}
                    max={todayAsIsoString}
                    min={MIN_LOOKUP_DATE_FOR_HOWS_MY_DRIVING_NY_LOOKUPS}
                    type="date"
                  />
                </div>
              </div>
              <hr />
              <div className="input-group mb-5">
                <FormControls.RangeWithCheckboxControl
                  enabled={resultsFilters.numberOfViolations !== undefined}
                  id="filter-results-number-violations"
                  initialValue={resultsFilters.numberOfViolations}
                  labelText="Number of violations ≥"
                  maxValue={maxViolationsCountForResults}
                />
              </div>
              <div className="sticky-apply-button input-group mt-4 d-grid">
                <button
                  className="btn btn-dark"
                  role="button"
                  type="submit"
                  value="Apply filters"
                >
                  Apply filters
                </button>
              </div>
            </form>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

const PlateTypeFilterOptions = React.memo(() => (
  <>
    <option value="">Choose...</option>
    {Object.entries(plateTypes).map(([typeName, type]) => (
      <option key={typeName} value={typeName}>
        {type.displayName}
      </option>
    ))}
  </>
))

const RegionFilterOptions = React.memo(() => (
  <>
    <option value="">Choose...</option>
    {regions.map((region: { code: string; name: string }) => (
      <option key={region.code} value={region.code}>
        {`${region.name} (${region.code})`}
      </option>
    ))}
  </>
))

export default FilterMenu
