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
          <div className="col-md-12 page-content-container">
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
    displayingPreviousLookup: false,
    resultsFilters: {
      ...defaultFilters,
      plateText: 'ABC',
    },
    resultsLength: 0,
  },
}

export const WithMultipleOwnResults: Story = {
  args: {
    displayingPreviousLookup: false,
    resultsFilters: defaultFilters,
    resultsLength: 2,
  },
}

export const WithOwnResult: Story = {
  args: {
    displayingPreviousLookup: false,
    resultsFilters: defaultFilters,
    resultsLength: 1,
  },
}

export const WithSharedResultOnly: Story = {
  args: {
    displayingPreviousLookup: true,
    resultsFilters: defaultFilters,
    resultsLength: 1,
  },
}

export const WithSharedAndOwnResults: Story = {
  args: {
    displayingPreviousLookup: true,
    resultsFilters: defaultFilters,
    resultsLength: 2,
  },
}

export const WithSharedAndMultipleOwnResults: Story = {
  args: {
    displayingPreviousLookup: true,
    resultsFilters: defaultFilters,
    resultsLength: 3,
  },
}

export default meta
