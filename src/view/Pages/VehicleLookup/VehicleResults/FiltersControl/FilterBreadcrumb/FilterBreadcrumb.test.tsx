import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FilterType } from 'types/resultsFilters'

import FilterBreadcrumb from './FilterBreadcrumb'

describe('FilterBreadcrumb', () => {
  const clearFilterFunction = jest.fn()
  const displayFiltersMenuFunction = jest.fn()

  const dateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  describe('rendering', () => {
    test.each([
      {
        filter: {
          args: {
            end: new Date('2025-07-11T00:00:00-04:00'),
          },
          field: 'queryDateRange',
          type: FilterType.DateRange,
        } as const,
      },
      {
        filter: {
          args: {
            start: new Date('2025-07-04T00:00:00-04:00'),
          },
          field: 'queryDateRange',
          type: FilterType.DateRange,
        } as const,
      },
      {
        filter: {
          args: {
            end: new Date('2025-07-11T00:00:00-04:00'),
            start: new Date('2025-07-04T00:00:00-04:00'),
          },
          field: 'queryDateRange',
          type: FilterType.DateRange,
        } as const,
      },
      {
        filter: {
          args: {
            end: new Date('2025-07-11T00:00:00-04:00'),
            start: new Date('2025-07-11T00:00:00-04:00'),
          },
          field: 'queryDateRange',
          type: FilterType.DateRange,
        } as const,
      },
      {
        filter: {
          args: {
            key: 'Plate',
            value: 'ABC1234',
          },
          field: 'plateText',
          type: FilterType.Text,
        } as const,
      },
      {
        filter: {
          args: {
            key: 'Violations ≥',
            value: 123,
          },
          field: 'numberOfViolations',
          type: FilterType.Threshold,
        } as const,
      },
    ])('render the breadcrumb for a filter object: $filter', ({ filter }) => {
      const { args } = filter

      render(
        <FilterBreadcrumb
          clearFilterFunction={clearFilterFunction}
          displayFiltersMenuFunction={displayFiltersMenuFunction}
          filter={filter}
        />,
      )

      if (args.key) {
        expect(screen.getByText(args.key)).toBeInTheDocument()
      }
      if (args.value) {
        expect(screen.getByText(`: ${args.value}`)).toBeInTheDocument()
      }

      if (args.end && args.start && args.end === args.start) {
        expect(screen.getByText('Date')).toBeInTheDocument()
        expect(screen.getByText(`: ${dateFormat.format(args.start)}`))
          .toBeInTheDocument()
      } else if (
        args.end &&
        args.start &&
        args.end.toDateString() !== args.start.toDateString()
      ) {
        expect(screen.getByText('Date')).toBeInTheDocument()
        expect(
          screen.getByText(
            `: ${dateFormat.format(args.start)} - ${dateFormat.format(args.end)}`,
          ),
        ).toBeInTheDocument()
      } else if (args.end && !args.start) {
        expect(screen.getByText('Date')).toBeInTheDocument()
        expect(screen.getByText(`: through ${dateFormat.format(args.end)}`))
          .toBeInTheDocument()
      } else if (args.start && !args.end) {
        expect(screen.getByText('Date')).toBeInTheDocument()
        expect(screen.getByText(`: after ${dateFormat.format(args.start)}`))
          .toBeInTheDocument()
      }
    })
  })

  it('should display the filter menu when the filter key or value is clicked', () => {
    const filter = {
      args: {
        key: 'Plate',
        value: 'ABC1234',
      },
      field: 'plateText',
      type: FilterType.Text,
    } as const

    render(
      <FilterBreadcrumb
        clearFilterFunction={clearFilterFunction}
        displayFiltersMenuFunction={displayFiltersMenuFunction}
        filter={filter}
      />,
    )

    const displayfilterMenuBreadcrumbLink = screen.getByLabelText(
      'display filters menu',
    )
    userEvent.click(displayfilterMenuBreadcrumbLink)

    expect(displayFiltersMenuFunction).toHaveBeenCalledTimes(1)
  })

  describe('removing filter breadcrumbs', () => {
    test.each([
      {
        filter: {
          args: {
            end: new Date('2025-07-11T00:00:00-04:00'),
            start: new Date('2025-07-04T00:00:00-04:00'),
          },
          field: 'queryDateRange',
          type: FilterType.DateRange,
        } as const,
      },
      {
        filter: {
          args: {
            key: 'Plate',
            value: 'ABC1234',
          },
          field: 'plateText',
          type: FilterType.Text,
        } as const,
      },
      {
        filter: {
          args: {
            key: 'Violations ≥',
            value: 123,
          },
          field: 'numberOfViolations',
          type: FilterType.Threshold,
        } as const,
      },
    ])('remove the filter breadcrumb for filter: $filter', ({ filter }) => {
      const { args, type } = filter

      render(
        <FilterBreadcrumb
          clearFilterFunction={clearFilterFunction}
          displayFiltersMenuFunction={displayFiltersMenuFunction}
          filter={filter}
        />,
      )

      if (type === FilterType.DateRange) {
        const removeDateFilterBreadcrumbLink =
          screen.getByLabelText('remove Date label')
        userEvent.click(removeDateFilterBreadcrumbLink)
      } else if ([FilterType.Text, FilterType.Threshold].includes(type)) {
        const removeTextOrThresholdFilterBreadcrumbLink = screen.getByLabelText(
          `remove ${args.key} label`,
        )
        userEvent.click(removeTextOrThresholdFilterBreadcrumbLink)
      }

      expect(clearFilterFunction).toHaveBeenCalledTimes(1)
    })
  })
})
