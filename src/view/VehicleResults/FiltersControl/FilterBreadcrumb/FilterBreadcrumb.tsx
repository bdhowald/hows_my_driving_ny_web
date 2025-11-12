import React from 'react'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import L10N from 'constants/display'
import {
  FilterType,
  ResultFilter,
  ResultsFilterSet,
} from 'types/resultsFilters'

// Add Font Awesome icons
library.add(faCircle, faCircleXmark)

const FilterBreadcrumb = ({
  clearFilterFunction,
  displayFiltersMenuFunction,
  filter,
}: {
  clearFilterFunction: (fieldName: keyof ResultsFilterSet) => void
  displayFiltersMenuFunction: () => void
  filter: ResultFilter
}) => {
  const { args, field, type } = filter

  if (type === FilterType.DateRange) {
    const endDate = args.end
      ? L10N.sitewide.dateFormat.format(args.end)
      : undefined
    const startDate = args.start
      ? L10N.sitewide.dateFormat.format(args.start)
      : undefined

    const rangeText = getDateRangeBreadcrumbText(endDate, startDate)

    return (
      <span className="filter-breadcrumb">
        <span
          aria-label="display filters menu"
          className="filter-breadcrumb-text"
          onClick={displayFiltersMenuFunction}
        >
          <span className="filter-breadcrumb-key">Date</span>
          {rangeText}
        </span>
        <FilterBreadcrumbCloseLink
          clearFilterFunction={clearFilterFunction}
          label="remove Date label"
          field={field}
        />
      </span>
    )
  }

  if ([FilterType.Text, FilterType.Threshold].includes(type)) {
    return (
      <span className="filter-breadcrumb">
        <span
          aria-label="display filters menu"
          className="filter-breadcrumb-text"
          onClick={displayFiltersMenuFunction}
        >
          <span className="filter-breadcrumb-key">{args.key}</span>
          {`: ${args.value}`}
        </span>
        <FilterBreadcrumbCloseLink
          clearFilterFunction={clearFilterFunction}
          label={`remove ${args.key} label`}
          field={field}
        />
      </span>
    )
  }
}

const FilterBreadcrumbCloseLink = ({
  clearFilterFunction,
  field,
  label,
}: {
  clearFilterFunction: (fieldName: keyof ResultsFilterSet) => void
  field: keyof ResultsFilterSet
  label: string
}) => (
  <span
    aria-label={label}
    className="filter-breadcrumb-remove-filter"
    onClick={() => clearFilterFunction(field)}
  >
    <FontAwesomeIcon
      icon={['fas', 'circle-xmark'] as IconProp}
      transform="grow-6"
      className="circle"
    />
  </span>
)

const getDateRangeBreadcrumbText = (
  endDate: string | undefined,
  startDate: string | undefined,
): string => {
  if (!endDate && !startDate) {
    throw Error('Date range breadcrumb text requires one date to calculate')
  }

  if (endDate && startDate) {
    if (endDate === startDate) {
      return `: ${startDate}`
    }
    return `: ${startDate} - ${endDate}`
  }

  if (endDate) {
    return `: through ${endDate}`
  }

  return `: after ${startDate}`
}

export default FilterBreadcrumb
