import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import FiltersControl from './FiltersControl'

const meta: Meta<typeof FiltersControl> = {
  title: 'Components/VehicleResults/FiltersControl',
  component: FiltersControl,
  args: {
    handleFilterFormSubmitFunction: (e) => {
      e.preventDefault()
      return true
    },
    maxViolationsCountForResults: 100,
  },
  decorators: [
    (Story) => (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
              <Story />
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

type Story = StoryObj<typeof FiltersControl>

const defaultFilters = {
  numberOfViolations: undefined,
  plateText: undefined,
  plateType: undefined,
  queryDateRange: {
    endDate: undefined,
    startDate: undefined,
  },
  state: undefined,
}

export const WithBreadcrumb: Story = {
  args: {
    resultsFilters: {
      ...defaultFilters,
      plateText: 'ABC',
    },
    resultsLength: 0,
  },
}

export const WithResult: Story = {
  args: {
    resultsFilters: defaultFilters,
    resultsLength: 1,
  },
}

export default meta
