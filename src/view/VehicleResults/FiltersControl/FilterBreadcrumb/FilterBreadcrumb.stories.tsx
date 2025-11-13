import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FilterType } from 'types/resultsFilters'

import FilterBreadcrumb from './FilterBreadcrumb'

const meta: Meta<typeof FilterBreadcrumb> = {
  title: 'Components/VehicleResults/FiltersControl/FilterBreadcrumb',
  component: FilterBreadcrumb,
  args: {
    clearFilterFunction: () => null,
    displayFiltersMenuFunction: () => null,
  },
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 page-content-container">
            <div className="jumbotron">
              <div className="filters-wrapper">
                <div className="active-filters">
                  {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                  <Story />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof FilterBreadcrumb>

export const DateFilterBreadcrumbWithEndDate: Story = {
  args: {
    filter: {
      args: {
        end: new Date('2025-07-11T00:00:00-04:00'),
      },
      field: 'queryDateRange',
      type: FilterType.DateRange,
    },
  },
}
export const DateFilterBreadcrumbWithStartDate: Story = {
  args: {
    filter: {
      args: {
        start: new Date('2025-07-04T00:00:00-04:00'),
      },
      field: 'queryDateRange',
      type: FilterType.DateRange,
    },
  },
}
export const DateFilterBreadcrumbWithRange: Story = {
  args: {
    filter: {
      args: {
        end: new Date('2025-07-11T00:00:00-04:00'),
        start: new Date('2025-07-04T00:00:00-04:00'),
      },
      field: 'queryDateRange',
      type: FilterType.DateRange,
    },
  },
}
export const DateFilterBreadcrumbWithRangeAsOneDate: Story = {
  args: {
    filter: {
      args: {
        end: new Date('2025-07-11T00:00:00-04:00'),
        start: new Date('2025-07-11T00:00:00-04:00'),
      },
      field: 'queryDateRange',
      type: FilterType.DateRange,
    },
  },
}
export const NumberOfViolationsFilterBreadcrumb: Story = {
  args: {
    filter: {
      args: {
        key: 'Violations ≥',
        value: 15,
      },
      field: 'numberOfViolations',
      type: FilterType.Threshold,
    },
  },
}
export const PlateFilterTextBreadcrumb: Story = {
  args: {
    filter: {
      args: {
        key: 'Plate',
        value: 'ABC1234',
      },
      field: 'plateText',
      type: FilterType.Text,
    },
  },
}
export const PlateFilterTypeBreadcrumb: Story = {
  args: {
    filter: {
      args: {
        key: 'Type',
        value: 'Passenger',
      },
      field: 'plateType',
      type: FilterType.Text,
    },
  },
}
export const StateFilterBreadcrumb: Story = {
  args: {
    filter: {
      args: {
        key: 'State',
        value: 'NY',
      },
      field: 'state',
      type: FilterType.Text,
    },
  },
}

export default meta
